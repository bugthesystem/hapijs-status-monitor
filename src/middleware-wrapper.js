const fs = require('fs');
const path = require('path');
const validate = require('./helpers/validate');
const onHeadersListener = require('./helpers/on-headers-listener');
const socketIoInit = require('./helpers/socket-io-init');

// hapi.js plugin register function
const middlewareWrapper = (server, options) => {
  const opts = validate(options);

  // Setup Socket.IO
  server.events.on('start', () => {
    socketIoInit(server.listener, opts.spans);
  });

  server.route({
    method: 'GET',
    path: opts.path,
    handler: () => {
      const renderedHtml =
        fs.readFileSync(path.join(__dirname, '/public/index.html'))
          .toString()
          .replace(/{{title}}/g, opts.title)
          .replace(/{{script}}/g, fs.readFileSync(path.join(__dirname, '/public/javascripts/app.js')))
          .replace(/{{style}}/g, fs.readFileSync(path.join(__dirname, '/public/stylesheets/style.css')));

      return renderedHtml;
    },
    config: opts.routeConfig,
  });

  // Hook into the middle of processing
  server.ext('onPreResponse', (request, h) => {
    if (request.response.isBoom || request.path === opts.path) {
      return h.continue;
    }

    const startTime = process.hrtime();
    const resp = request.response;

    resp.events.once('finish', () => {
      onHeadersListener(resp.statusCode, startTime, opts.spans);
    });

    // Continue Processing
    return h.continue;
  });
};

module.exports = middlewareWrapper;
