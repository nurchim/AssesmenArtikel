import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { RUBRIC, scoreFor, calculateTotal } from './rubric';

export function generatePdf({identity,scores,notes,overallNote}) {
  const doc = new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const width = doc.internal.pageSize.getWidth();
  const left=15; const right=width-15;
  const stamp = new Date().toLocaleString('id-ID',{dateStyle:'long',timeStyle:'short'});
  const txt = (value) => String(value || '-');
  doc.setFillColor(12,53,74);doc.rect(0,0,width,36,'F');
  doc.setTextColor(255,255,255);doc.setFont('helvetica','bold');doc.setFontSize(17);
  doc.text('LAPORAN SELF-ASSESSMENT',left,17);
  doc.setFont('helvetica','normal');doc.setFontSize(10);doc.text('Penilaian Artikel Ilmiah | Rubrik 27 Indikator',left,25);
  doc.setTextColor(31,51,68);doc.setFontSize(10);
  let y=45;
  [['Nama mahasiswa',identity.name],['NIM',identity.nim],['Judul artikel',identity.title],['Tanggal penilaian',stamp]].forEach(([label,value])=>{
    doc.setFont('helvetica','bold');doc.text(label,left,y);
    doc.setFont('helvetica','normal');const lines=doc.splitTextToSize(': '+txt(value),125);
    doc.text(lines,65,y);y+=Math.max(7,lines.length*5.2);
  });
  y+=3;
  const total=calculateTotal(scores);
  doc.setFillColor(231,244,244);doc.roundedRect(left,y,width-30,19,2,2,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(12);doc.text('TOTAL NILAI',left+6,y+8);
  doc.setFontSize(17);doc.text(`${total} / 100`,right-6,y+12,{align:'right'});
  y+=27;
  autoTable(doc,{
    startY:y,margin:{left,right:15},head:[['Komponen','Nilai','Maksimal']],
    body:RUBRIC.map(section=>[section.name,String(scoreFor(section,scores)),String(section.max)]),
    foot:[['TOTAL',String(total),'100']],theme:'grid',
    styles:{font:'helvetica',fontSize:9,cellPadding:2.7,textColor:[34,53,66]},
    headStyles:{fillColor:[12,53,74],textColor:255},footStyles:{fillColor:[224,239,238],textColor:[20,58,67],fontStyle:'bold'},
    columnStyles:{1:{halign:'center',cellWidth:22},2:{halign:'center',cellWidth:24}},
  });
  y=doc.lastAutoTable.finalY+12;
  doc.setFontSize(12);doc.setFont('helvetica','bold');doc.text('RINCIAN PENILAIAN PER INDIKATOR',left,y);y+=5;
  RUBRIC.forEach(section=>{
    autoTable(doc,{
      startY:y,margin:{left,right:15},
      head:[[{content:`${section.name} (${scoreFor(section,scores)}/${section.max})`,colSpan:3}]],
      body:section.items.map(item=>[
        {content:`${item.code} - ${item.name}${(notes[item.code]||'').trim()?`\nCatatan: ${notes[item.code].trim()}`:''}`},
        String(scores[item.code]),String(item.max)
      ]),
      theme:'grid',styles:{font:'helvetica',fontSize:8.4,cellPadding:2.4,overflow:'linebreak'},
      headStyles:{fillColor:[29,93,110],textColor:255},
      columnStyles:{1:{halign:'center',cellWidth:19},2:{halign:'center',cellWidth:19}},
      didDrawPage:()=>{},
    });
    y=doc.lastAutoTable.finalY+6;
  });
  if(overallNote.trim()){
    if(y>245){doc.addPage();y=20}
    doc.setFont('helvetica','bold');doc.setFontSize(11);doc.text('CATATAN UMUM / RENCANA PERBAIKAN',left,y);y+=6;
    doc.setFont('helvetica','normal');doc.setFontSize(9);
    const lines=doc.splitTextToSize(overallNote, width-30);
    lines.forEach(line=>{if(y>275){doc.addPage();y=20}doc.text(line,left,y);y+=5;});
  }
  const pages=doc.getNumberOfPages();
  for(let page=1;page<=pages;page++){
    doc.setPage(page);doc.setDrawColor(219,227,231);doc.line(left,284,right,284);
    doc.setFont('helvetica','normal');doc.setFontSize(7.5);doc.setTextColor(104,119,130);
    doc.text('Self-assessment berdasarkan Rubrik Review Artikel (Nurchim, UDB Surakarta)',left,290);
    doc.text(`${page} / ${pages}`,right,290,{align:'right'});
  }
  const safeNim=(identity.nim||'mahasiswa').replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,40);
  doc.save(`penilaian_artikel_${safeNim}.pdf`);
}
