# Tentang Dataset

---

# <i>Overview</i> Dataset

Dataset ini merupakan kumpulan gambar sampah yang terdiri dari berbagai jenis sampah yang sering dijumpai di lingkungan rumah tangga. Semua gambar disimpan dalam format .png, .jpg, dan .jpeg untuk memastikan kompatibilitas luas dengan berbagai aplikasi pengolahan citra dan model pembelajaran mesin.

Dataset mencakup total 10 jenis sampah utama dengan jumlah gambar sebagai berikut:

| Jenis Sampah   | Jumlah Gambar |
|----------------|---------------|
| Daun           | 706           |
| Kaca           | 289           |
| Karet          | 207           |
| Kayu           | 166           |
| Kertas         | 389           |
| Logam          | 316           |
| Plastik        | 489           |
| Styrofoam      | 296           |
| Tekstil        | 150           |
| Sisa Makanan   | 221           |

Jumlah keseluruhan <code>2326</code>

Dataset ini dirancang untuk mendukung pengembangan sistem klasifikasi dan identifikasi sampah berbasis citra, yang dapat membantu dalam pengelolaan sampah rumah tangga secara lebih efektif dan ramah lingkungan.

➡️ [Akses Dataset Sapujagat di Roboflow](https://app.roboflow.com/cc25cf145/sapujagat)

---

# <i>Gathering</i> Dataset

Dataset yang digunakan untuk membangun <i>project</i> ini diperoleh proses <i>gathering</i> menggunakan beberapa cara berikut:
- Memotret sampah di lingkungan sekitar
- <i>Scraping image</i> dengan bantuan <i>python</i> melalui mesin pencarian <i>microsoft bing</i>
- <i>Open source</i> dataset melalui <i>Kaggle</i> dan <i>Roboflow</i>
<img src="https://drive.google.com/uc?export=view&id=1sguehrOrBLLpUZIOm0OWShBY9tz6v8m_" alt="Deskripsi Gambar" width="500" high = "200" />

---
# <i>Preprocessing</i> Data

Proses preprocessing dilakukan untuk mempersiapkan dataset agar siap digunakan dalam pelatihan model deteksi dan klasifikasi sampah. Tahapan preprocessing yang dilakukan adalah sebagai berikut:

- **Membuat bounding box** untuk menandai setiap objek sampah agar dapat diklasifikasikan ke dalam kelas tertentu.
- **Auto-Orient:** Gambar secara otomatis disesuaikan orientasinya agar konsisten.
- **Resize:** Gambar diubah ukurannya dengan metode stretch ke dimensi 640x640 piksel.
- **Grayscale:** Beberapa gambar diubah menjadi skala abu-abu untuk variasi data.
- **Auto-Adjust Contrast:** Kontras gambar dioptimalkan menggunakan metode Adaptive Equalization.
- **Filter Null:** Semua gambar yang tidak memiliki anotasi (bounding box) dihapus agar data bersih dan valid.

Semua proses preprocessing ini dilakukan menggunakan platform **Roboflow** yang memudahkan anotasi, preprocessing, dan manajemen dataset.

---

# <i>Augmentasi</i> Data

Augmentasi adalah teknik memperbanyak variasi data pelatihan dengan melakukan transformasi pada gambar asli tanpa mengubah labelnya. Tujuan augmentasi adalah meningkatkan kemampuan model untuk mengenali objek dalam berbagai kondisi dan sudut pandang, serta mengurangi risiko overfitting.

Augmentasi yang diterapkan pada dataset ini meliputi:

- Output per contoh pelatihan: 3 variasi augmentasi dihasilkan dari setiap gambar asli.
- **Rotasi 90°:** Rotasi gambar searah jarum jam dan berlawanan arah jarum jam.
- **Rotasi bebas:** Rotasi acak antara -15° hingga +15° untuk variasi sudut kecil.
- **Shear:** Distorsi gambar secara horizontal dan vertikal sebesar ±10°.
- **Grayscale:** 15% dari gambar diubah menjadi skala abu-abu untuk variasi warna.

Semua proses augmentasi ini juga dilakukan secara otomatis di **Roboflow**, sehingga dataset menjadi lebih kaya dan model dapat belajar dari berbagai kondisi gambar yang lebih beragam.

---

