// import necessary modules
const bcrypt = require('bcrypt');
const supabase = require('./supabaseClient');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman';

// Function to handle user registration
const registerUser = async (request, h) => {
  const { username, email, password } = request.payload;
  if (!username || !email || !password) {
    return h.response({
      status: 'fail',
      message: 'Username, email, dan password wajib diisi',
    }).code(400);
  }
  // Cek email sudah ada di Supabase
  const { data: existingUsers, error: selectError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email);
  if (selectError) {
    return h.response({
      status: 'fail',
      message: 'Gagal memeriksa email',
    }).code(500);
  }
  if (existingUsers && existingUsers.length > 0) {
    return h.response({
      status: 'fail',
      message: 'Email sudah terdaftar',
    }).code(409);
  }
  // Cek username sudah ada
  const { data: existingUsernames, error: selectUsernameError } = await supabase
    .from('users')
    .select('id')
    .eq('username', username);
  if (selectUsernameError) {
    return h.response({
      status: 'fail',
      message: 'Gagal memeriksa username',
    }).code(500);
  }
  if (existingUsernames && existingUsernames.length > 0) {
    return h.response({
      status: 'fail',
      message: 'Username sudah terdaftar',
    }).code(409);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, email, password: hashedPassword }])
    .select();
  if (error) {
    console.error('Supabase error:', error);
    return h.response({
      status: 'fail',
      message: 'Gagal mendaftar user',
    }).code(500);
  }
  const user = data[0];
  const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
  return h.response({
    status: 'success',
    message: 'User registered',
    data: { id: user.id, username: user.username, email: user.email, token },
  }).code(201);
};

// Function to handle user login
const loginUser = async (request, h) => {
  const { email, password } = request.payload;
  if (!email || !password) {
    return h.response({
      status: 'fail',
      message: 'Email dan password wajib diisi',
    }).code(400);
  }
  // Cari user di Supabase berdasarkan email
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);
  if (error) {
    return h.response({
      status: 'fail',
      message: 'Gagal mencari user',
    }).code(500);
  }
  if (!users || users.length === 0) {
    return h.response({
      status: 'fail',
      message: 'Email tidak ditemukan',
    }).code(401);
  }
  const user = users[0];
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return h.response({
      status: 'fail',
      message: 'Password salah',
    }).code(401);
  }
  const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
  return h.response({
    status: 'success',
    message: 'Login berhasil',
    data: { id: user.id, username: user.username, email: user.email, token },
  }).code(200);
};

// Function to handle user check-in
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
  return h.response({
    status: 'success',
    message: 'Check-in berhasil',
    data: data[0],
  }).code(201);
};

// Function to handle get check-in history
const getCheckinHistory = async (request, h) => {
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
  // Ambil riwayat check-in user, urut terbaru ke terlama
  const { data, error } = await supabase
    .from('checkins')
    .select('date')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  if (error) {
    return h.response({
      status: 'fail',
      message: 'Gagal mengambil riwayat check-in',
    }).code(500);
  }
  // Kembalikan array tanggal check-in
  const dates = data ? data.map(item => item.date) : [];
  return h.response({
    status: 'success',
    data: { history: dates },
  }).code(200);
};

// Function to handle get check-in history by month
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

// Export the registerUser, loginUser, checkInUser, and getCheckinHistory functions for use in routes  
module.exports = { 
  registerUser, 
  loginUser, 
  checkInUser, 
  getCheckinHistory, 
  getCheckinHistoryByMonth };