// import necessary modules
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// Initialize the Hapi server
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    // Enable CORS for all origins
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

    // Register the routes
  server.route(routes);

    // Start the server
  await server.start();
  // Log the server URL
  console.log(`Server running at: ${server.info.uri}`);
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(err);
    // Exit the process with a failure code
  process.exit(1);
});

// Call the init function to start the server
init();