# Dokumentasi API Sapu Jagat

Dokumen ini menjelaskan cara penggunaan endpoint API backend Sapu Jagat untuk integrasi frontend Vue.js dan pengujian via Postman.

---

## 1. Register User
- **Endpoint:** `POST /users`
- **Body (JSON):**
  ```json
  {
    "username": "namakamu",
    "email": "emailkamu@example.com",
    "password": "passwordku"
  }
  ```
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "message": "User registered",
    "data": {
      "id": "...",
      "username": "namakamu",
      "email": "emailkamu@example.com",
      "token": "<jwt_token>"
    }
  }
  ```
- **Catatan:** Simpan token JWT untuk autentikasi selanjutnya.

---

## 2. Login User
- **Endpoint:** `POST /login`
- **Body (JSON):**
  ```json
  {
    "email": "emailkamu@example.com",
    "password": "passwordku"
  }
  ```
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "message": "Login berhasil",
    "data": {
      "id": "...",
      "username": "namakamu",
      "email": "emailkamu@example.com",
      "token": "<jwt_token>"
    }
  }
  ```
- **Catatan:** Simpan token JWT untuk digunakan pada request yang membutuhkan autentikasi.

---

## 3. Edit User (Username/Password)
- **Endpoint:** `PUT /users`
- **Header:**
  - `Authorization: Bearer <jwt_token>`
- **Body (JSON):**
  ```json
  {
    "username": "username_baru",
    "password": "password_baru"
  }
  ```
  > **Catatan:**
  > - Bisa mengirim salah satu saja, misal hanya `"username"` atau hanya `"password"`.

- **Response Sukses:**
  ```json
  {
    "status": "success",
    "message": "User berhasil diupdate",
    "data": {
      "id": "uuid",
      "username": "username_baru",
      "email": "emailkamu@example.com"
    }
  }
  ```

- **Error jika token tidak valid:**
  ```json
  {
    "status": "fail",
    "message": "Token tidak valid"
  }
  ```

- **Error jika username sudah dipakai user lain:**
  ```json
  {
    "status": "fail",
    "message": "Username sudah digunakan user lain"
  }
  ```

---

## 4. Daily Check-in
- **Endpoint:** `POST /checkin`
- **Header:**
  - `Authorization: Bearer <jwt_token>`
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "message": "Check-in berhasil, point bertambah",
    "data": {
      "id": "...",
      "user_id": "...",
      "date": "YYYY-MM-DD",
      "points": 150
    }
  }
  ```
- **Error jika sudah check-in hari ini:**
  ```json
  {
    "status": "fail",
    "message": "Kamu sudah check-in hari ini"
  }
  ```

---

## 5. Riwayat Check-in (Semua)
- **Endpoint:** `GET /checkin/history`
- **Header:**
  - `Authorization: Bearer <jwt_token>`
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "data": {
      "history": [
        "2025-06-01",
        "2025-06-02"
        // dst
      ]
    }
  }
  ```

---

## 6. Riwayat Check-in per Bulan
- **Endpoint:** `GET /checkin/history/month?month=YYYY-MM`
- **Header:**
  - `Authorization: Bearer <jwt_token>`
- **Contoh:**
  ```
  GET /checkin/history/month?month=2025-06
  Authorization: Bearer <jwt_token>
  ```
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "data": {
      "dates": [
        "2025-06-01",
        "2025-06-02"
        // dst
      ]
    }
  }
  ```
- **Error jika parameter salah:**
  ```json
  {
    "status": "fail",
    "message": "Parameter month wajib diisi dengan format YYYY-MM"
  }
  ```

---

## 7. Cara Menggunakan JWT di Frontend
- Setelah login/register, simpan token JWT (misal di localStorage).
- Untuk request yang butuh autentikasi, tambahkan header:
  - `Authorization: Bearer <jwt_token>`
- Jika token expired/invalid, backend akan merespon 401.

---

## 8. Contoh Penggunaan di Vue (axios)
```js
// Simpan token setelah login/register
localStorage.setItem('token', token);

// Request dengan autentikasi
axios.get('/checkin/history', {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
});
```

---

## 9. Testing dengan Postman
1. Register atau login untuk dapatkan token.
2. Tambahkan header Authorization di setiap request yang butuh autentikasi.
3. Gunakan endpoint sesuai dokumentasi di atas.

---

## 10. Catatan Penting
- Semua tanggal format `YYYY-MM-DD` (UTC).
- Token JWT tidak perlu disimpan di database.
- Jika ingin fitur tambahan (reward, streak, dsb), diskusikan dengan tim backend.

---

## 11. Redeem Point
- **Endpoint:** `POST /redeem`
- **Header:**
  - `Authorization: Bearer <jwt_token>`
- **Body (JSON):**
  ```json
  {
    "type": "ewallet",         // "ewallet", "pulsa", atau "token"
    "provider": "ovo",         // untuk ewallet/pulsa (opsional, tergantung type)
    "amount": 10000,            // nominal yang di-redeem
    "points": 900,              // point yang akan dipotong
    "target": "08123456789"    // nomor tujuan (hp/akun ewallet/token listrik)
  }
  ```
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "message": "Redeem berhasil",
    "data": {
      "type": "ewallet",
      "provider": "ovo",
      "amount": 10000,
      "points_dipakai": 900,
      "points_sisa": 1600,
      "target": "08123456789"
    }
  }
  ```
- **Catatan:**
  - Status di database langsung `success` setelah redeem.
- **Error jika point tidak cukup:**
  ```json
  {
    "status": "fail",
    "message": "Point tidak cukup"
  }
  ```
- **Error jika data tidak lengkap:**
  ```json
  {
    "status": "fail",
    "message": "Data redeem tidak lengkap"
  }
  ```

---

## 12. Get Redeem History
- **Endpoint:** `GET /redeem`
- **Header:**
  - `Authorization: Bearer <jwt_token>`
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "...",
        "user_id": "...",
        "type": "ewallet",
        "provider": "ovo",
        "amount": 10000,
        "points": 900,
        "target": "08123456789",
        "status": "success",
        "date": "2025-06-08",
        "created_at": "2025-06-08T10:00:00.000Z"
      }
      // ...data redeem lain milik user...
    ]
  }
  ```
- **Catatan:**
  - Hanya menampilkan riwayat redeem milik user yang sedang login (berdasarkan token JWT).
  - Data diurutkan dari yang terbaru ke terlama.

---

## 13. Get User Profile
- **Endpoint:** `GET /users/profile`
- **Header:**
  - `Authorization: Bearer <jwt_token>`
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "data": {
      "id": "uuid",
      "username": "namakamu",
      "email": "emailkamu@example.com",
      "points": 150
    }
  }
  ```
- **Catatan:**
  - Endpoint ini mengambil data user yang sedang login berdasarkan token JWT.
  - Cocok untuk frontend yang ingin menampilkan data user terbaru setelah update profil dan checkin.

---

## 14. Get Last Check-in
- **Endpoint:** `GET /checkin/last`
- **Header:**
  - `Authorization: Bearer <jwt_token>`
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "data": {
      "last_checkin": "2025-06-08" // atau null jika belum pernah check-in
    }
  }
  ```
- **Catatan:**
  - Mengembalikan tanggal check-in terakhir milik user yang sedang login (berdasarkan token JWT).
  - Jika user belum pernah check-in, maka `last_checkin` bernilai null.

---

## 15. Prediksi Sampah (ML Predict)
- **Endpoint:** `POST /predict`
- **Header:**
  - `Authorization: Bearer <jwt_token>`
- **Body:**  
  - Form-data, key: `image` (type: File), value: file gambar yang ingin diprediksi.
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "detected": "Plastik",
    "points_added": 250,
    "current_points": 1250,
    "results": [
      {
        "class": "Plastik",
        "confidence": 0.28,
        "bbox": [16, 64, 323, 573]
      }
      // ...deteksi lain jika ada
    ]
  }
  ```
- **Catatan:**
  - Setiap kali prediksi berhasil, user akan mendapatkan 250 poin.
  - Hasil deteksi dengan confidence tertinggi akan disimpan ke tabel `history`.

---

## 16. Riwayat Prediksi (Predict History)
- **Endpoint:** `GET /predict/history`
- **Header:**
  - `Authorization: Bearer <jwt_token>`
- **Response Sukses:**
  ```json
  {
    "status": "success",
    "history": [
      {
        "id": 1,
        "filename": "contoh.jpg",
        "detected": "Plastik",
        "date": "2024-06-11",
        "created_at": "2024-06-11T13:00:00.000Z"
      }
      // ...riwayat lain
    ]
  }
  ```
- **Catatan:**
  - Hanya menampilkan riwayat prediksi milik user yang sedang login (berdasarkan token JWT).
  - Data diurutkan dari yang terbaru ke terlama.

---
