// import necessary modules
const { registerUser, loginUser, editUser, getUserProfile } = require('./handlers/userHandler');
const { checkInUser, getCheckinHistoryByMonth, getLastCheckin } = require('./handlers/checkinHandler');
const { redeemPoint, getRedeemHistory } = require('./handlers/redeemsHandler');
const { predictHandler } = require('./handlers/mlHandler');
const { getPredictHistory } = require('./handlers/predictHistoryHandler');
const { submitQuizHandler, getQuizStatusHandler } = require('./handlers/quizHandler');

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
  // Route for edit user
  {
    method: 'PUT',
    path: '/users',
    handler: editUser,
  },
  // Route for user daily check-in
  {
    method: 'POST',
    path: '/checkin',
    handler: checkInUser,
  },
  // Route for get check-in history by month
  {
    method: 'GET',
    path: '/checkin/history/month',
    handler: getCheckinHistoryByMonth,
  },
  // Route for get last check-in date
  {
    method: 'GET',
    path: '/checkin/last',
    handler: getLastCheckin,
  },
  // Route for redeem point
  {
    method: 'POST',
    path: '/redeem',
    handler: redeemPoint,
  },
  // Route for get redeem history
  {
    method: 'GET',
    path: '/redeem',
    handler: getRedeemHistory,
  },
  // Route for get user profile
  {
    method: 'GET',
    path: '/users/profile',
    handler: getUserProfile,
  },
  // Route for machine learning prediction
  {
    method: 'POST',
    path: '/predict',
    handler: predictHandler,
    options: {
      payload: {
        output: 'stream',
        parse: true,
        multipart: true,
        maxBytes: 5 * 1024 * 1024, // 5MB
        allow: 'multipart/form-data'
      }
    }
  },
  // Route for get predict history
  {
    method: 'GET',
    path: '/predict/history',
    handler: getPredictHistory,
  },
  // Route for submit quiz
  {
    method: 'POST',
    path: '/quiz/submit',
    handler: submitQuizHandler,
  },
  // Route for get quiz status
  {
    method: 'GET',
    path: '/quiz/status',
    handler: getQuizStatusHandler,
  },
];

// Export the routes for use in the server
module.exports = routes;