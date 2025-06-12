// import necessary modules
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const routes = require('./routes');
const { loadModel } = require('./handlers/mlHandler');
const Path = require('path');

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

  // Register the Inert plugin
  await server.register(Inert);

  // Serve files from the Model directory
  server.route({
    method: 'GET',
    path: '/model/{param*}',
    handler: {
      directory: {
        path: __dirname + '/Model',
        listing: true,
      },
    },
  });

  // Serve files from the uploads directory
  server.route({
    method: 'GET',
    path: '/uploads/{param*}',
    options: { auth: false },
    handler: {
      directory: {
        path: Path.resolve(process.cwd(), 'uploads'),
        listing: false,
        index: false,
      },
    },
  });

  // Register the routes
  server.route(routes);

  // Start the server
  await server.start();
  // Log the server URL
  console.log(`Server running at: ${server.info.uri}`);

  // Load model SETELAH server jalan
  await loadModel();
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(err);
  // Exit the process with a failure code
  process.exit(1);
});

// Call the init function to start the server
init();