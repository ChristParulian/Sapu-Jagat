const supabase = require('../supabaseClient');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman';

// Redeem point API
const redeemPoint = async (request, h) => {
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
  const { type, provider, amount, points, target } = request.payload;

  // Validasi input
  if (!type || !amount || !points || !target) {
    return h.response({ status: 'fail', message: 'Data redeem tidak lengkap' }).code(400);
  }

  // Ambil point user sekarang
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('points')
    .eq('id', userId)
    .single();

  if (userError || !userData) {
    return h.response({ status: 'fail', message: 'Gagal mengambil data user' }).code(500);
  }

  if (userData.points < points) {
    return h.response({ status: 'fail', message: 'Point tidak cukup' }).code(400);
  }

  // Kurangi point user
  const newPoints = userData.points - points;
  const { error: updateError } = await supabase
    .from('users')
    .update({ points: newPoints })
    .eq('id', userId);

  if (updateError) {
    return h.response({ status: 'fail', message: 'Gagal mengurangi point' }).code(500);
  }

  // Simpan riwayat redeem
  const { error: redeemError } = await supabase.from('redeems').insert([
    {
      user_id: userId,
      type,
      provider,
      amount,
      points,
      target,
      status: 'success',
      date: new Date().toISOString().slice(0, 10),
      created_at: new Date().toISOString()
    }
  ]);
  if (redeemError) {
    return h.response({ status: 'fail', message: 'Gagal menyimpan riwayat redeem' }).code(500);
  }

  return h.response({
    status: 'success',
    message: 'Redeem berhasil',
    data: {
      type,
      provider,
      amount,
      points_dipakai: points,
      points_sisa: newPoints,
      target
    }
  }).code(200);
};

// Get redeem history API
const getRedeemHistory = async (request, h) => {
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
    .from('redeems')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return h.response({ status: 'fail', message: 'Gagal mengambil riwayat redeem' }).code(500);
  }

  return h.response({
    status: 'success',
    data
  }).code(200);
};

module.exports = { redeemPoint, getRedeemHistory };
