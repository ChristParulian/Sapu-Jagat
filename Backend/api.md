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
