'use strict'; // eslint-disable-line strict, lines-around-directive

const socketIo = require('socket.io');
const gatherOsMetrics = require('./gather-os-metrics');

let io;

module.exports = (server, config) => {
  if (io === null || io === undefined) {
    if (config.websocket) {
      io = config.websocket;
    } else {
      io = socketIo(server);
    }

    io.on('connection', (socket) => {
      socket.emit('start', config.spans);

      socket.on('change', () => {
        socket.emit('start', config.spans);
      });
    });

    config.spans.forEach((currentSpan) => {
      const span = currentSpan;
      span.os = [];
      span.responses = [];

      const interval = setInterval(() => gatherOsMetrics(io, span), span.interval * 1000);
      interval.unref(); // don't keep node.js process up
    });
  }
};
