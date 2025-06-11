// import necessary modules
const supabase = require('../supabaseClient');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// GET /predict/history - Ambil riwayat prediksi user (butuh JWT)
const getPredictHistory = async (request, h) => {
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

    // Ambil riwayat prediksi user dari tabel history
    const { data, error } = await supabase
      .from('history')
      .select('id, filename, detected, date, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return h.response({ status: 'fail', message: 'Gagal mengambil riwayat prediksi' }).code(500);
    }

    return h.response({ status: 'success', history: data }).code(200);
  } catch (err) {
    return h.response({ status: 'fail', message: err.message }).code(500);
  }
};

module.exports = { getPredictHistory };
