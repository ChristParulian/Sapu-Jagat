const bcrypt = require('bcrypt');
const supabase = require('../supabaseClient');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman';

// Register
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

// Login
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

// Edit user (update username dan/atau password)
const editUser = async (request, h) => {
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
  const { username, password } = request.payload;

  if (!username && !password) {
    return h.response({
      status: 'fail',
      message: 'Username atau password harus diisi',
    }).code(400);
  }

  // Cek jika username sudah dipakai user lain
  if (username) {
    const { data: existingUsernames, error: usernameError } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .neq('id', userId);
    if (usernameError) {
      return h.response({
        status: 'fail',
        message: 'Gagal memeriksa username',
      }).code(500);
    }
    if (existingUsernames && existingUsernames.length > 0) {
      return h.response({
        status: 'fail',
        message: 'Username sudah digunakan user lain',
      }).code(409);
    }
  }

  // Siapkan data update
  const updateData = {};
  if (username) updateData.username = username;
  if (password) updateData.password = await bcrypt.hash(password, 10);

  // Update user di Supabase
  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', userId)
    .select();

  if (error) {
    return h.response({
      status: 'fail',
      message: 'Gagal mengupdate user',
    }).code(500);
  }

  return h.response({
    status: 'success',
    message: 'User berhasil diupdate',
    data: {
      id: userId,
      username: data[0].username,
      email: data[0].email,
    },
  }).code(200);
};

module.exports = { registerUser, loginUser, editUser };
