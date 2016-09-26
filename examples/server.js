'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

server.register({
  register: require('hapijs-status-monitor')
});

// Add the "/return-status/{statusCode}" route
server.route({
  method: 'GET',
  path: '/return-status/{statusCode}',
  handler: function (request, reply) {
    const statusCode = request.params.statusCode;

    return reply(statusCode).code(parseInt(statusCode));
  }
});

// Start the server
server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});
