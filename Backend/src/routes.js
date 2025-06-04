// import necessary modules
const { registerUser, loginUser, checkInUser } = require('./handler');

// Define the routes for the application
const routes = [
    // Route for user registration        
  {
    method: 'POST',
    path: '/users',
    handler: registerUser,
  },
  // Route for user login
  {
    method: 'POST',
    path: '/login',
    handler: loginUser,
  },
  // Route for user daily check-in
  {
    method: 'POST',
    path: '/checkin',
    handler: checkInUser,
  },
];

// Export the routes for use in the server
module.exports = routes;