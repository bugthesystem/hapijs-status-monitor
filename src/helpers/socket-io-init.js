'use strict'; // eslint-disable-line strict, lines-around-directive

const socketIo = require('socket.io');
const gatherOsMetrics = require('./gather-os-metrics');

let io;

module.exports = (server, spans) => {
  if (io === null || io === undefined) {
    io = socketIo(server);

    io.on('connection', (socket) => {
      socket.emit('start', spans);
      socket.on('change', () => {
        socket.emit('start', spans);
      });
    });

    spans.forEach((currentSpan) => {
      const span = currentSpan;
      span.os = [];
      span.responses = [];

      const interval = setInterval(() => gatherOsMetrics(io, span), span.interval * 1000);
      interval.unref(); // don't keep node.js process up
    });
  }
};
