// import necessary modules
const users = require('./data');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

// Function to handle user registration
const registerUser = async (request, h) => {
    // Extract username and password from the request payload
  const { username, password } = request.payload;
    // Validate the input
  if (!username || !password) {
    // If either username or password is missing, return a 400 error
    return h.response({
      status: 'fail',
      message: 'Username dan password wajib diisi',
    }).code(400);
  }
    // Check if the username already exists
  if (users.find((u) => u.username === username)) {
    // If the username is already taken, return a 409 error 
    return h.response({
      status: 'fail',
      message: 'Username sudah terdaftar',
    }).code(409);
  }
  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user object with a unique ID
  const newUser = {
    id: nanoid(),
    username,
    password: hashedPassword,
  };
    // Add the new user to the users array
  users.push(newUser);
    // Return a success response with the new user's ID and username
  return h.response({
    status: 'success',
    message: 'User registered',
    data: { id: newUser.id, username: newUser.username },
  }).code(201);
};

// Export the registerUser function for use in routes  
module.exports = { registerUser };