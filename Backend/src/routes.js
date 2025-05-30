// import necessary modules
const { registerUser } = require('./handler');

// Define the routes for the application
const routes = [
    // Route for user registration        
  {
    method: 'POST',
    path: '/register',
    handler: registerUser,
  },
];

// Export the routes for use in the server
module.exports = routes;