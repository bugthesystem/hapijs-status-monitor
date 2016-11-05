const defaultConfig = require('./default-config');

module.exports = (config) => {
  if (!config) {
    return defaultConfig;
  }

  if (typeof config.title !== 'string') {
    config.title = defaultConfig.title;
  }

  if (typeof config.path !== 'string') {
    config.path = defaultConfig.path;
  }

  if (typeof config.spans !== 'object') {
    config.spans = defaultConfig.spans;
  }

  if (typeof config.routeConfig !== 'object') {
    config.routeConfig = defaultConfig.routeConfig;
  }

  return config;
};
