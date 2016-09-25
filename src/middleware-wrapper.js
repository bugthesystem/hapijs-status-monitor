const fs = require('fs');
const path = require('path');
const onHeaders = require('on-headers');
const validate = require('./helpers/validate');
const onHeadersListener = require('./helpers/on-headers-listener');
const socketIoInit = require('./helpers/socket-io-init');

// hapi.js plugin register function
var middlewareWrapper = function (server, options, next) {
  options = validate(options);

  // Setup Socket.IO
  server.on('start', () => {
    socketIoInit(server.listener, options.spans);
  });

  server.route({
    method: 'GET',
    path: options.path,
    handler: (request, reply) => {
      const renderedHtml =
        fs.readFileSync(path.join(__dirname, '/public/index.html'))
          .toString()
          .replace(/{{title}}/g, options.title)
          .replace(/{{script}}/g, fs.readFileSync(path.join(__dirname, '/public/javascripts/app.js')))
          .replace(/{{style}}/g, fs.readFileSync(path.join(__dirname, '/public/stylesheets/style.css')));

      reply(renderedHtml)
        .header('Content-Type', 'text/html')
        .code(200)
    }
  });

  // hook into the middle of processing
  server.ext('onPreResponse', (request, reply) => {
    if (request.response || request.path === options.path) {
      return reply.continue();
    }

    const startTime = process.hrtime();
    const resp = request.response;

    resp.once('finish', () => {
      onHeaders(resp, () => { onHeadersListener(resp.statusCode, startTime, options.spans) });
    });

    return reply.continue();
  });

  // continue processing
  return next();
}

module.exports = middlewareWrapper;
