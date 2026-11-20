// Transkripsi komponen, indikator, dan bobot dari "Rubrik Review Artikel" (53 halaman).
// Skala input 0..bobot maksimum, tanpa kategori lulus/tidak lulus karena tidak ada ambang keputusan di sumber.
export const RUBRIC = [
  { id:'intro', name:'Introduction', subtitle:'Masalah, pertanyaan, urgensi, dan kontribusi penelitian', max:15, items:[
    {code:'I1', name:'Signifikansi masalah penelitian', max:5, guide:'Masalah spesifik, didukung bukti/literatur, serta memiliki dampak ilmiah atau praktis.'},
    {code:'I2', name:'Kejelasan research questions dan tujuan', max:4, guide:'Tujuan atau pertanyaan spesifik, selaras dengan masalah, dan dapat dijawab dengan metode.'},
    {code:'I3', name:'Argumentasi urgensi dan kontribusi penelitian', max:6, guide:'Urgensi dijelaskan dan kontribusi ilmiah spesifik, relevan, serta realistis untuk diuji.'}
  ]},
  { id:'literature', name:'Related Works / Literature Review', subtitle:'Pemetaan riset terdahulu dan posisi kebaruan', max:15, items:[
    {code:'LW1',name:'Cakupan dan relevansi literatur',max:3,guide:'Literatur penting, relevan, terbaru, dan karya dasar tercakup secara memadai.'},
    {code:'LW2',name:'Sintesis kritis penelitian terdahulu',max:4,guide:'Studi dibandingkan/disintesis menurut tema atau metode, bukan hanya diringkas.'},
    {code:'LW3',name:'Pembandingan pendekatan terdahulu',max:4,guide:'Metode, data, evaluasi, dan keterbatasan dibandingkan secara adil.'},
    {code:'LW4',name:'Posisi penelitian dan bukti novelty',max:4,guide:'Kebaruan dibuktikan secara spesifik, bernilai ilmiah, dan dapat diuji.'}
  ]},
  { id:'methods', name:'Methods', subtitle:'Kesesuaian metode, data, analisis, transparansi, dan etika', max:30, items:[
    {code:'M1',name:'Kesesuaian desain penelitian',max:5,guide:'Desain sesuai tujuan dan mendukung jenis kesimpulan yang dibuat.'},
    {code:'M2',name:'Kelayakan dataset, sampel, atau sumber data',max:5,guide:'Sumber, kecukupan, dan relevansi data dijelaskan serta dapat dipertanggungjawabkan.'},
    {code:'M3',name:'Validitas pengukuran atau pengumpulan data',max:5,guide:'Prosedur/instrumen jelas dan kualitas pengukuran atau data dapat diperiksa.'},
    {code:'M4',name:'Transparansi dan reproducibility',max:5,guide:'Langkah, parameter, serta prosedur evaluasi cukup rinci untuk pemeriksaan atau replikasi.'},
    {code:'M5',name:'Rigor analitis dan validasi',max:6,guide:'Teknik analisis tepat dan validasi/pembanding memadai; hindari data leakage.'},
    {code:'M6',name:'Kepatuhan etik dan prosedural',max:4,guide:'Izin, persetujuan etik bila diperlukan, kepentingan, dan penggunaan data dijelaskan.'}
  ]},
  { id:'results', name:'Results', subtitle:'Kelengkapan, keakuratan, dan kekuatan bukti penelitian', max:20, items:[
    {code:'R1',name:'Kesesuaian hasil dengan tujuan penelitian',max:4,guide:'Setiap tujuan utama terjawab oleh hasil yang relevan.'},
    {code:'R2',name:'Kelengkapan dan transparansi temuan',max:4,guide:'Temuan penting, termasuk hasil yang tidak sesuai harapan, dilaporkan secara jujur.'},
    {code:'R3',name:'Akurasi analisis dan pelaporan',max:5,guide:'Metrik tepat dan angka dalam narasi, tabel, dan gambar konsisten.'},
    {code:'R4',name:'Robustness dan evaluasi komparatif',max:5,guide:'Ada baseline atau pembanding sesuai dan pengujian pada skenario memadai.'},
    {code:'R5',name:'Kejelasan tabel dan gambar',max:2,guide:'Judul, label, caption, dan visualisasi jelas serta tidak menyesatkan.'}
  ]},
  { id:'discussion', name:'Discussion & Conclusion', subtitle:'Interpretasi, implikasi, keterbatasan, dan ketepatan simpulan', max:15, items:[
    {code:'D1',name:'Kedalaman dan validitas interpretasi',max:5,guide:'Makna hasil dibahas proporsional berdasarkan bukti, bukan mengulang angka.'},
    {code:'D2',name:'Pembandingan dengan literatur terdahulu',max:3,guide:'Temuan dihubungkan secara kritis dengan studi terdahulu dan alasan perbedaan dibahas.'},
    {code:'D3',name:'Implikasi teoretis dan praktis',max:3,guide:'Manfaat ilmiah dan praktis dijelaskan tanpa melebihi bukti.'},
    {code:'D4',name:'Keterbatasan dan penjelasan alternatif',max:3,guide:'Keterbatasan spesifik, pengaruhnya, dan alternatif penjelasan diakui.'},
    {code:'D5',name:'Kesimpulan berdasarkan bukti',max:1,guide:'Kesimpulan menjawab tujuan dan tidak memunculkan klaim baru.'}
  ]},
  { id:'references', name:'References', subtitle:'Relevansi, kemutakhiran, akurasi, dan etika referensi', max:5, items:[
    {code:'REF1',name:'Relevansi dan kredibilitas sumber',max:2,guide:'Referensi ilmiah tepercaya dan benar-benar mendukung isi artikel.'},
    {code:'REF2',name:'Kemutakhiran dan karya fundamental',max:1,guide:'Karya mutakhir dan fundamental yang relevan tidak diabaikan.'},
    {code:'REF3',name:'Ketepatan bibliografi dan sitasi',max:1,guide:'Metadata bibliografi benar, konsisten, dan cocok dengan sitasi di teks.'},
    {code:'REF4',name:'Etika dan keseimbangan sitasi',max:1,guide:'Sitasi proporsional; hindari manipulasi dan pengabaian studi bertentangan.'}
  ]}
];
export const ALL_ITEMS = RUBRIC.flatMap(section=>section.items);
export const MAX_SCORE = RUBRIC.reduce((sum,s)=>sum+s.max,0);
export function scoreFor(section, scores){return section.items.reduce((sum,item)=>sum+(Number.isFinite(scores[item.code]) ? scores[item.code]:0),0)}
export function completedCount(scores){return ALL_ITEMS.filter(item=>Number.isInteger(scores[item.code])&&scores[item.code]>=0&&scores[item.code]<=item.max).length}
export function calculateTotal(scores){return RUBRIC.reduce((sum,section)=>sum+scoreFor(section,scores),0)}
export function validScore(item, value){return Number.isInteger(value) && value>=0 && value<=item.max}
