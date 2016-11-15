const Hapi = require('hapi');
const hapijsStatusMonitor = require('hapijs-status-monitor');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000,
});

server.register({ register: hapijsStatusMonitor });

// Add the "/return-status/{statusCode}" route
server.route({
  method: 'GET',
  path: '/return-status/{statusCode}',
  handler: (request, reply) => {
    const statusCode = parseInt(request.params.statusCode, 10);
    return reply(statusCode).code(statusCode);
  },
});

// Start the server
server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});
