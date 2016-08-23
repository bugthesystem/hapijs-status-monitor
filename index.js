
'use strict';

const Package = require('./package.json')
const Hapi = require('hapi');
const Hoek = require('hoek');
const fs = require('fs');
const path = require('path');
const os = require('os');
const pidusage = require('pidusage');

let io;

const defaults = {
  path: '/status',
  spans: [{
    interval: 1,
    retention: 60
  }, {
      interval: 5,
      retention: 60
    }, {
      interval: 15,
      retention: 60
    }]
};

const last = (array) => {
  return array[array.length - 1];
};

const gatherOsMetrics = (io, span) => {
  const defaultResponse = {
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    count: 0,
    mean: 0,
    timestamp: Date.now()
  };

  pidusage.stat(process.pid, (err, stat) => {

    // Convert from B to MB
    stat.memory = stat.memory / 1024 / 1024;
    stat.load = os.loadavg();
    stat.timestamp = Date.now();

    span.os.push(stat);
    if (!span.responses[0] || last(span.responses).timestamp + (span.interval * 1000) < Date.now()) span.responses.push(defaultResponse);

    if (span.os.length >= span.retention) span.os.shift();
    if (span.responses[0] && span.responses.length > span.retention) span.responses.shift();

    sendMetrics(io, span);
  });
};

const sendMetrics = (io, span) => {
  io.emit('stats', {
    os: span.os[span.os.length - 2],
    responses: span.responses[span.responses.length - 2],
    interval: span.interval,
    retention: span.retention
  });
};

/*  the HAPI plugin register function  */
var register = function (server, options, next) {

  options = Hoek.applyToDefaults(defaults, options);

  //Setup socket.io
  server.on('start', () => {
    if (io === null || io === undefined) {

      io = require('socket.io').listen(server.listener);

      io.on('connection', (socket) => {
        socket.emit('start', options.spans);
        socket.on('change', function () { socket.emit('start', options.spans); });
      });

      options.spans.forEach((span) => {
        span.os = [];
        span.responses = [];
        setInterval(() => gatherOsMetrics(io, span), span.interval * 1000);
      });
    }
  })

  /*  hook into the middle of processing  */
  server.ext("onPreResponse", (request, reply) => {
    let statusCode = request.response.statusCode;
    const startTime = process.hrtime();
    if (request.path === options.path) {
      return reply(fs.readFileSync(path.join(__dirname + '/index.html'))).header('Content-Type', 'text/html').code(200);
    } else {

      const diff = process.hrtime(startTime);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
      const category = Math.floor(statusCode / 100);

      options.spans.forEach((span) => {
        const last = span.responses[span.responses.length - 1];
        if (last !== undefined &&
          span.responses.last().timestamp / 1000 + span.interval > Date.now() / 1000) {
          span.responses.last()[category]++;
          span.responses.last().count++;
          span.responses.last().mean = span.responses.last().mean + ((responseTime - span.responses.last().mean) / span.responses.last().count);
        } else {
          span.responses.push({
            '2': category === 2 ? 1 : 0,
            '3': category === 3 ? 1 : 0,
            '4': category === 4 ? 1 : 0,
            '5': category === 5 ? 1 : 0,
            count: 1,
            mean: responseTime,
            timestamp: Date.now()
          });
        }
      });
    }

    return reply.continue()
  })

  /*  continue processing  */
  return next()
}

/*  provide meta-information as expected by HAPI  */
register.attributes = { pkg: Package }

/*  export register function, wrapped in a plugin object  */
module.exports = { register: register }