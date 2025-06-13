# Sapu-Jagat
Capstone Project Tim CC25-CF145 Coding Camp 2025 Powered By DBS Foundation

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

## Cara Membuat Custom Model berbasis YOLOV8 dengan Dataset dari Roboflow
1. Install library berikut:
   ```
   !pip install roboflow
   !pip install ultralytics
   ```
2. Import library berikut:
   ```
   import ultralytics
   from roboflow import Roboflow
   from ultralytics import YOLO
   from IPython.display import Image
   ultralytics.checks()
   ```
3. Import dataset dari roboflow melalui api
   ```
    rf = Roboflow(api_key="PKpcGmbYZkw68ZTHLcoa")
    project = rf.workspace("cc25cf145").project("sapujagat")
    version = project.version(8)
    dataset = version.download("yolov8")
   ```
   untuk memperoleh API dapat mengikuti cara berikut:
   <code>Projects > Versions > Pilih Versions > Download Dataset > Show Download Code > Copy</code>
4. Buka file <code>data.yaml</code> dari folder yang sudah di import dari roboflow
   ```
    test: ../test/images
    train: ../train/images
    val: ../valid/images
   ```
   ganti path train, valid, test berdasarkan lokasi folder penyimpanan masing-masing gambar
5. Jalankan model dengan perintah berikut:
    ```
    model = YOLO('yolov8n.pt')
    model.train(data=dataset.location + '/data.yaml', epochs=20, imgsz=640, lr0=0.01)
   ```
   untuk parameter bisa disesuaikan dengan kebutuhan
   
## Cara Instalasi & Menjalankan Project

### Backend
1. Masuk ke folder backend:
   ```
   cd Backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. (Opsional) Install ESLint untuk linter:
   ```
   npm install eslint --save-dev
   npx eslint --init
   ```
4. Jalankan backend:
   ```
   npm start
   ```

### Frontend
1. Masuk ke folder frontend:
   ```
   cd ../Frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Jalankan frontend:
   ```
   npm run dev
   ```

---

## Struktur Folder/Arsitektur
```
sapu-jagat/
├── Backend/            # Kode backend (Node.js, Hapi, Supabase, API, linter, model ML, uploads)
│   ├── api.md
│   ├── package.json
│   ├── eslint.config.mjs
│   ├── src/
│   │   ├── handlers/   # Semua handler endpoint
│   │   ├── Model/      # Model ML (YOLOv8, tfjs)
│   │   ├── routes.js
│   │   ├── server.js
│   │   └── supabaseClient.js
│   └── uploads/        # File upload user (foto validasi, dsb)
├── Frontend/           # Kode frontend (Vue.js, Vite, Tailwind, dsb)
│   ├── package.json
│   ├── src/
│   │   ├── pages/      # Halaman utama (dashboard, quiz, dsb)
│   │   ├── components/ # Komponen UI
│   │   ├── services/   # API service
│   │   └── ...
│   └── public/         # Asset publik (gambar, logo, dsb)
├── Machine Learning/   # Notebook, model, dan file ML
│   └── tfjs_model/     # Model YOLOv8 hasil export tfjs
├── README.md
└── ...
```


