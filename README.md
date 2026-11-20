# ArtikelCheck — Aplikasi Self-Assessment Artikel Ilmiah

Aplikasi React + Vite, frontend-only, untuk menilai artikel ilmiah menggunakan **6 komponen, 27 indikator, dan total 100 poin**, berdasarkan PDF *Rubrik Review Artikel* (Nurchim, Universitas Duta Bangsa Surakarta).

## Fitur
- Form nama mahasiswa, NIM, judul artikel.
- Penilaian setiap indikator pada skala **bilangan bulat 0 sampai bobot maksimal**; nilai kosong berbeda dari skor 0.
- Komponen dan skor dijumlahkan otomatis, indikator yang telah diisi ditandai.
- Catatan evaluasi per indikator dan catatan umum.
- Simpan otomatis ke `localStorage` browser (tidak menggunakan database atau akun).
- Unduh laporan PDF berisi identitas, ringkasan skor komponen, seluruh 27 skor, dan catatan.
- Responsif untuk desktop dan ponsel, serta konfirmasi sebelum reset.
- PDF hanya dapat diunduh jika seluruh identitas dan 27 skor terisi.

**Catatan ilmiah:** Sumber rubrik tidak menentukan predikat, kategori lolos/tidak lolos, atau ambang kelayakan. Aplikasi tidak menambahkan klasifikasi tersebut.

## Menjalankan secara lokal
1. Instal Node.js 20.19+ (disarankan Node.js 22).
2. Buka terminal pada folder proyek.
3. Jalankan:

```bash
npm install
npm run dev
```

4. Akses alamat lokal yang ditampilkan Vite (umumnya `http://localhost:5173`).

Periksa build produksi dan unit test:

```bash
npm test
npm run build
npm run preview
```

## Upload ke GitHub

### Opsi A: lewat situs GitHub
1. Masuk ke https://github.com/new, buat repository misalnya `self-assessment-artikel`.
2. Ekstrak ZIP proyek ini, lalu unggah **isi folder proyek** ke root repository lewat **Add file > Upload files**.
3. Pastikan file `package.json`, `index.html`, `vercel.json`, dan folder `src` ada di root, bukan di folder proyek berlapis.
4. Commit changes.

### Opsi B: lewat git di terminal

```bash
git init
git add .
git commit -m "Initial ArtikelCheck app"
git branch -M main
git remote add origin https://github.com/USERNAME/self-assessment-artikel.git
git push -u origin main
```

Ganti `USERNAME` dengan akun GitHub. Jika menggunakan terminal, buat repository kosong di GitHub lebih dahulu. **Jangan unggah `node_modules/`**.

## Deploy ke Vercel (GitHub otomatis)
1. Buka https://vercel.com/new dan login ke Vercel.
2. Pilih **Import Git Repository**, hubungkan GitHub jika belum terhubung.
3. Pilih repository `self-assessment-artikel` lalu **Import**.
4. Pastikan konfigurasi:
   - Framework Preset: **Vite**
   - Root Directory: **./**
   - Build Command: **npm run build**
   - Output Directory: **dist**
   - Install Command: **npm install** (atau default)
5. Klik **Deploy**. Setelah selesai Vercel menyediakan URL domain `*.vercel.app`.
6. Perubahan berikutnya yang di-push ke branch produksi akan dideploy otomatis.

Alternatif CLI: `npx vercel` kemudian `npx vercel --prod` (butuh login/otorisasi Vercel).

## Struktur

```
self-assessment-artikel/
├── index.html
├── package.json
├── vercel.json
├── src/
│   ├── main.jsx       # antarmuka & state
│   ├── style.css      # tampilan responsif
│   ├── rubric.js      # 27 indikator & bobot
│   ├── rubric.test.js # pengujian hitung
│   └── pdf.js         # generator laporan PDF
└── README.md
```

## Privasi
Informasi yang diisi hanya disimpan di `localStorage` browser yang sama, bukan disinkronkan lintas perangkat. Membersihkan data situs/browser dapat menghilangkan isian. Unduh PDF sebelum pindah browser atau perangkat. Font UI memakai Google Fonts; fungsi PDF menggunakan library yang terbundel di aplikasi.
