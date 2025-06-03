// import necessary modules
const bcrypt = require('bcrypt');
const supabase = require('./supabaseClient');

// Function to handle user registration
const registerUser = async (request, h) => {
  const { username, password } = request.payload;
  if (!username || !password) {
    return h.response({
      status: 'fail',
      message: 'Username dan password wajib diisi',
    }).code(400);
  }
  // Cek username sudah ada di Supabase
  const { data: existingUsers, error: selectError } = await supabase
    .from('users')
    .select('id')
    .eq('username', username);
  if (selectError) {
    return h.response({
      status: 'fail',
      message: 'Gagal memeriksa username',
    }).code(500);
  }
  if (existingUsers && existingUsers.length > 0) {
    return h.response({
      status: 'fail',
      message: 'Username sudah terdaftar',
    }).code(409);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password: hashedPassword }])
    .select();
  if (error) {
    console.error('Supabase error:', error); // Tambahkan baris ini
    return h.response({
      status: 'fail',
      message: 'Gagal mendaftar user',
    }).code(500);
  }
  return h.response({
    status: 'success',
    message: 'User registered',
    data: { id: data[0].id, username: data[0].username },
  }).code(201);
};

// Function to handle user login
const loginUser = async (request, h) => {
  const { username, password } = request.payload;
  if (!username || !password) {
    return h.response({
      status: 'fail',
      message: 'Username dan password wajib diisi',
    }).code(400);
  }
  // Cari user di Supabase
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username);
  if (error) {
    return h.response({
      status: 'fail',
      message: 'Gagal mencari user',
    }).code(500);
  }
  if (!users || users.length === 0) {
    return h.response({
      status: 'fail',
      message: 'Username tidak ditemukan',
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
  return h.response({
    status: 'success',
    message: 'Login berhasil',
    data: { id: user.id, username: user.username },
  }).code(200);
};

// Export the registerUser and loginUser functions for use in routes  
module.exports = { registerUser, loginUser };