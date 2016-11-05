
# hapijs-status-monitor

[![Build Status](https://travis-ci.org/ziyasal/hapijs-status-monitor.svg?branch=master)](https://travis-ci.org/ziyasal/hapijs-status-monitor) [![npm](https://img.shields.io/npm/v/hapijs-status-monitor.svg)](https://www.npmjs.com/package/hapijs-status-monitor) [![Coverage Status](https://coveralls.io/repos/github/ziyasal/hapijs-status-monitor/badge.svg?branch=master)](https://coveralls.io/github/ziyasal/hapijs-status-monitor?branch=master)

Simple, self-hosted module based on [Socket.IO](http://socket.io) and
[Chart.js](http://www.chartjs.org) to report realtime server metrics for
[hapi.js](http://hapijs.com) servers.

**Inspired from [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor)**

![screenshot](./docs/images/screenshot.jpg)

## Installation & setup

**Install package**

```sh
npm install hapijs-status-monitor --save
```

**Register plugin**

```js
server.register({
  register: require('hapijs-status-monitor')
});
```
**Run server and go to** `/status`

## Run examples

1. Go to `cd examples/`
2. Run `npm i`
3. Run server `npm start`
4. Go to `http://localhost:8000/status`

## Options

Monitor can be configured by passing options object into server register method

```js
server.register({
  register: require('hapijs-status-monitor'),
  options: {
    title: 'My Status Monitor',
    routeConfig: {
      auth: false
    }
  }
});
```

Default options:

```js
title: 'hapi.js Status',
path: '/status',
spans: [{
  interval: 1,     // Every second
  retention: 60    // Keep 60 datapoints in memory
}, {
  interval: 5,     // Every 5 seconds
  retention: 60
}, {
  interval: 15,    // Every 15 seconds
  retention: 60
}],
routeConfig: {}  // Route options, see https://github.com/hapijs/hapi/blob/master/API.md#route-options
```

## License

[MIT](./license.txt)
