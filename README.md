# Sapu-Jagat
Capstone Project CC25-CF145

## Daftar Anggota Tim
- (ML) MC006D5X2400 - Nadia Alzena Zahrani - Universitas Brawijaya - [Aktif]
- (ML) MC011D5Y1471 - Muhammad Rizki Putra - Universitas Padjadjaran - [Aktif]
- (ML) MC109D5X0661 - Siti Arfah Hamidah - Institut Pendidikan Indonesia Garut - [Aktif]
- (FEBE) FC190D5Y2190 - Nur Aziz Raihan - Universitas Bhayangkara Jakarta Raya - [Aktif]
- (FEBE) FC190D5Y2219 - Christoba Parulian Sihombing - Universitas Bhayangkara Jakarta Raya - [Aktif]
- (FEBE) FC190D5Y1972 - Farid Ilham - Universitas Bhayangkara Jakarta Raya - [Aktif]

## Deskripsi Project
SapuJagat, solusi digital yang mengedukasi sekaligus membuat pemilahan sampah lebih mudah dan menyenangkan melalui gamifikasi. Fitur utama SapuJagat meliputi deteksi jenis sampah (Jagat Kenal), rekomendasi penanganan (Jagat Pintar), validasi aktivitas lewat scan (Scan Jagat), sistem poin dan riwayat (Dompet Jagat), daily check-in (Jagat Aktif), pencarian bank sampah terdekat (Peta Jagat), pemantauan aksi (Aksi Jagat), dan pengelolaan akun (Profil Jagat). SapuJagat juga memberikan apresiasi berupa poin di Dompet Jagat bagi pengguna yang aktif memilah sampah, sehingga partisipasi masyarakat semakin meningkat dan pengelolaan sampah berkelanjutan dapat terwujud.

## Fitur Utama
- **Halaman Dashboard (Beranda Jagat)**  
  Tampilan utama setelah login yang menampilkan ringkasan fitur aplikasi.

- **Deteksi Sampah (Jagat Kenal)**  
  Upload gambar dan tampilkan jenis sampah (simulasi/ML sederhana).

- **Rekomendasi Penanganan (Jagat Pintar)**  
  Saran penanganan sesuai jenis sampah (misal: organik → kompos).

- **Validasi Aktivitas (Scan Jagat)**  
  Upload atau simulasi scan QR code untuk validasi kegiatan.

- **Dompet Jagat**  
  Sistem koin, saldo, dan riwayat transaksi pengguna.

- **Check-In Harian (Jagat Aktif)**  
  Tombol check-in harian untuk mendapatkan reward.

- **Peta Bank Sampah (Peta Jagat)**  
  Integrasi Google Maps API atau Leaflet untuk menampilkan lokasi bank sampah terdekat.

- **Riwayat Kegiatan (Aksi Jagat)**  
  Daftar kegiatan pengguna yang telah tervalidasi.

- **Akun & Profil Jagat**  
  Fitur register, login, edit profil, dan logout.

## Teknologi yang Digunakan

### Front-end
- Vue.js (Framework)
- Vite (Module Bundler)
- Axios (Library)
- Tailwind CSS (Library)
- Leaflet (Library map)

### Back-end
- Node.js
- Hapi (Framework)
- Supabase (Database)

### Machine Learning
- Tensorflow
- Tensorflow.js
- Numpy
- Seaborn
- Matplotlib
- Scikit-Learn
- Roboflow

## Cara Instalasi & Menjalankan Project
1. Clone repository ini:
   ```
   git clone https://github.com/username/sapu-jagat.git
   ```
2. Masuk ke direktori project:
   ```
   cd sapu-jagat
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Jalankan aplikasi:
   ```
   npm start
   ```

## Struktur Folder/Arsitektur
```
sapu-jagat/
├── backend/           # Kode backend (API, ada package.json di sini)
├── frontend/          # Kode frontend (Vue.js, ada package.json di sini)
├── machine-learning/  # Kode dan model Machine Learning
├── README.md
└── ...
```


