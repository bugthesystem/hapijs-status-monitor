const Hapi = require('hapi');
const hapijsStatusMonitor = require('hapijs-status-monitor');

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 8000,
});


// Add the "/return-status/{statusCode}" route
server.route({
  method: 'GET',
  path: '/return-status/{statusCode}',
  handler: (request, h) => {
    const statusCode = parseInt(request.params.statusCode, 10);
    return h.response(statusCode).code(statusCode);
  },
});

// Start the server
async function start() {
  try {
    await server.register({ plugin: hapijsStatusMonitor })
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();
