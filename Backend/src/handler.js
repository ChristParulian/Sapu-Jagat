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

// Export the registerUser and loginUser functions for use in routes  
module.exports = { registerUser, loginUser };