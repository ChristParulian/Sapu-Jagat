const supabase = require('../supabaseClient');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman';

// Check-in
const checkInUser = async (request, h) => {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return h.response({
      status: 'fail',
      message: 'Token tidak ditemukan',
    }).code(401);
  }
  const token = authHeader.split(' ')[1];
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return h.response({
      status: 'fail',
      message: 'Token tidak valid',
    }).code(401);
  }
  const userId = payload.id;
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  // Cek apakah user sudah check-in hari ini
  const { data: existingCheckin, error } = await supabase
    .from('checkins')
    .select('id')
    .eq('user_id', userId)
    .eq('date', today);
  if (error) {
    return h.response({
      status: 'fail',
      message: 'Gagal memeriksa check-in',
    }).code(500);
  }
  if (existingCheckin && existingCheckin.length > 0) {
    return h.response({
      status: 'fail',
      message: 'Kamu sudah check-in hari ini',
    }).code(409);
  }
  // Simpan check-in baru
  const { data, error: insertError } = await supabase
    .from('checkins')
    .insert([{ user_id: userId, date: today }])
    .select();
  if (insertError) {
    return h.response({
      status: 'fail',
      message: 'Gagal melakukan check-in',
    }).code(500);
  }
  // Tambahkan 50 point ke user
  // Ambil point sekarang
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('points')
    .eq('id', userId)
    .single();
  if (userError) {
    return h.response({
      status: 'fail',
      message: 'Gagal mengambil data user',
    }).code(500);
  }
  const newPoints = (userData.points || 0) + 50;
  // Update point user
  const { error: updateError } = await supabase
    .from('users')
    .update({ points: newPoints })
    .eq('id', userId);
  if (updateError) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan point',
    }).code(500);
  }
  return h.response({
    status: 'success',
    message: 'Check-in berhasil, point bertambah',
    data: {
      ...data[0],
      points: newPoints
    },
  }).code(201);
};

// Get check-in history by month
const getCheckinHistoryByMonth = async (request, h) => {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return h.response({
      status: 'fail',
      message: 'Token tidak ditemukan',
    }).code(401);
  }
  const token = authHeader.split(' ')[1];
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return h.response({
      status: 'fail',
      message: 'Token tidak valid',
    }).code(401);
  }
  const userId = payload.id;
  const { month } = request.query;
  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return h.response({
      status: 'fail',
      message: 'Parameter month wajib diisi dengan format YYYY-MM',
    }).code(400);
  }
  // Ambil tanggal awal dan akhir bulan
  const startDate = `${month}-01`;
  const endDate = new Date(Number(month.slice(0, 4)), Number(month.slice(5, 7)), 0)
    .toISOString()
    .slice(0, 10);
  const { data, error } = await supabase
    .from('checkins')
    .select('date')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });
  if (error) {
    return h.response({
      status: 'fail',
      message: 'Gagal mengambil riwayat check-in',
    }).code(500);
  }
  const dates = data ? data.map(item => item.date) : [];
  return h.response({
    status: 'success',
    data: { dates },
  }).code(200);
};

module.exports = { checkInUser, getCheckinHistoryByMonth };
