const pidusage = require('pidusage');
const os = require('os');
const sendMetrics = require('./send-metrics');

module.exports = (io, span) => {
  const defaultResponse = {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    count: 0,
    mean: 0,
    timestamp: Date.now(),
  };

  pidusage(process.pid, (err, stat) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      return;
    }

    const statObj = stat;
    statObj.memory = statObj.memory / 1024 / 1024; // Convert from B to MB
    statObj.load = os.loadavg();
    statObj.timestamp = Date.now();
    span.os.push(statObj);

    const last = span.responses[span.responses.length - 1];
    if (!span.responses[0] || last.timestamp + (span.interval * 1000) < Date.now()) {
      span.responses.push(defaultResponse);
    }

    // todo: I think this check should be moved somewhere else
    if (span.os.length >= span.retention) span.os.shift();
    if (span.responses[0] && span.responses.length > span.retention) span.responses.shift();

    sendMetrics(io, span);
  });
};
