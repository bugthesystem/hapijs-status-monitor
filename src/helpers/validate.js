const defaultConfig = require('./default-config');

module.exports = (config) => {
  const cfg = config;

  if (!cfg) {
    return defaultConfig;
  }

  if (typeof cfg.title !== 'string') {
    cfg.title = defaultConfig.title;
  }

  if (typeof cfg.path !== 'string') {
    cfg.path = defaultConfig.path;
  }

  if (typeof cfg.spans !== 'object') {
    cfg.spans = defaultConfig.spans;
  }

  if (typeof cfg.routeConfig !== 'object') {
    cfg.routeConfig = defaultConfig.routeConfig;
  }

  return cfg;
};
