const supabase = require('../supabaseClient');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// POST /quiz/submit
const submitQuizHandler = async (request, h) => {
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

    // Cek apakah user sudah pernah submit kuis
    const { data } = await supabase
      .from('quiz_history')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (data) {
      return h.response({ status: 'fail', message: 'Kuis sudah pernah dikerjakan' }).code(403);
    }

    // Tambahkan 500 poin ke user
    const { data: userData } = await supabase.from('users').select('points').eq('id', userId).single();
    const newPoints = (userData?.points || 0) + 500;
    await supabase.from('users').update({ points: newPoints }).eq('id', userId);

    // Simpan riwayat submit kuis
    await supabase.from('quiz_history').insert([{ user_id: userId }]);

    return h.response({ status: 'success', message: 'Kuis berhasil disubmit', points_added: 500, current_points: newPoints }).code(200);
  } catch (err) {
    return h.response({ status: 'fail', message: err.message }).code(500);
  }
};

// GET /quiz/status
const getQuizStatusHandler = async (request, h) => {
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

    const { data } = await supabase
      .from('quiz_history')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    return h.response({ status: 'success', done: !!data }).code(200);
  } catch (err) {
    return h.response({ status: 'fail', message: err.message }).code(500);
  }
};

module.exports = { submitQuizHandler, getQuizStatusHandler };
