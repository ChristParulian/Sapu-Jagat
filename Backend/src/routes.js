// import necessary modules
const { registerUser, loginUser } = require('./handler');

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
];

// Export the routes for use in the server
module.exports = routes;