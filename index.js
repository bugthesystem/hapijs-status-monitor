const pkg = require('./package.json');
const register = require('./src/middleware-wrapper');

module.exports.plugin = {
  register,
  name: 'hapijs-status-monitor',
  pkg,
};
