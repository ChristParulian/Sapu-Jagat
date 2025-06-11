const supabase = require('../supabaseClient');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

const UPLOAD_DIR = path.join(__dirname, '../../uploads');

// POST /waste-validation
// Body: multipart/form-data (image, waste_type, description, time, date)
const submitWasteValidation = async (request, h) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return h.response({ status: 'fail', message: 'Token tidak ditemukan' }).code(401);
    }
    const token = authHeader.split(' ')[1];
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return h.response({ status: 'fail', message: 'Token tidak valid' }).code(401);
    }
    const userId = payload.id;
    const { waste_type, description, time, date } = request.payload;
    const imageFile = request.payload.image;
    if (!imageFile || !waste_type || !description || !time || !date) {
      return h.response({ status: 'fail', message: 'Semua field wajib diisi' }).code(400);
    }
    // Simpan file ke server, kompres jika > 500KB
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const fileExt = imageFile.hapi.filename.split('.').pop();
    const fileName = `waste-${userId}-${Date.now()}.${fileExt}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    let fileBuffer = imageFile._data || imageFile;
    if (fileBuffer.length > 500 * 1024) {
      // Kompres gambar pakai Jimp
      const jimpImage = await Jimp.read(fileBuffer);
      // Quality 70, bisa diubah sesuai kebutuhan
      await jimpImage.quality(70).writeAsync(filePath);
      fileBuffer = fs.readFileSync(filePath);
    } else {
      fs.writeFileSync(filePath, fileBuffer);
    }
    // Simpan path relatif ke database (misal: uploads/waste-xxx.jpg)
    const relativePath = `uploads/${fileName}`;
    const { error } = await supabase.from('waste_validation').insert([
      {
        user_id: userId,
        photo: relativePath,
        waste_type,
        description,
        time,
        date
      }
    ]);
    if (error) {
      return h.response({ status: 'fail', message: 'Gagal menyimpan data' }).code(500);
    }
    return h.response({ status: 'success', message: 'Data validasi berhasil disimpan', photoPath: relativePath }).code(201);
  } catch (err) {
    return h.response({ status: 'fail', message: err.message }).code(500);
  }
};

// GET /waste-validation/history
const getWasteValidationHistory = async (request, h) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return h.response({ status: 'fail', message: 'Token tidak ditemukan' }).code(401);
    }
    const token = authHeader.split(' ')[1];
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return h.response({ status: 'fail', message: 'Token tidak valid' }).code(401);
    }
    const userId = payload.id;
    const { data, error } = await supabase
      .from('waste_validation')
      .select('id, photo, waste_type, description, time, date, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      return h.response({ status: 'fail', message: 'Gagal mengambil riwayat validasi' }).code(500);
    }
    return h.response({ status: 'success', history: data }).code(200);
  } catch (err) {
    return h.response({ status: 'fail', message: err.message }).code(500);
  }
};

// DELETE /waste-validation/{id}
const deleteWasteValidation = async (request, h) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return h.response({ status: 'fail', message: 'Token tidak ditemukan' }).code(401);
    }
    const token = authHeader.split(' ')[1];
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return h.response({ status: 'fail', message: 'Token tidak valid' }).code(401);
    }
    const userId = payload.id;
    const { id } = request.params;
    // Ambil data validasi untuk dapat path foto dan cek kepemilikan
    const { data, error } = await supabase
      .from('waste_validation')
      .select('photo, user_id')
      .eq('id', id)
      .single();
    if (error || !data) {
      return h.response({ status: 'fail', message: 'Data tidak ditemukan' }).code(404);
    }
    if (data.user_id !== userId) {
      return h.response({ status: 'fail', message: 'Tidak diizinkan menghapus data user lain' }).code(403);
    }
    // Hapus file foto jika ada
    const photoPath = path.join(__dirname, '../../', data.photo);
    if (data.photo && fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }
    // Hapus data di database
    await supabase.from('waste_validation').delete().eq('id', id);
    return h.response({ status: 'success', message: 'Data dan foto berhasil dihapus' }).code(200);
  } catch (err) {
    return h.response({ status: 'fail', message: err.message }).code(500);
  }
};

module.exports = { submitWasteValidation, getWasteValidationHistory, deleteWasteValidation };
