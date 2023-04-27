
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
await server.register({ plugin: require('hapijs-status-monitor') });
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
await server.register({
  plugin: require('hapijs-status-monitor'),
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
path: '/status', // Path to Status Page
base: '/', // href attribute of the base html tag 
websocket: null, // The Socket.io instance to be used, if none provided a new one will be created!
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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/1651945?v=4" width="75px;"/><br /><sub>z i λ a s a l</sub>](http://www.ziyasal.com)<br />[💻](https://github.com/ziyasal/hapijs-status-monitor/commits?author=ziyasal "Code") [⚠️](https://github.com/ziyasal/hapijs-status-monitor/commits?author=ziyasal "Tests") [📖](https://github.com/ziyasal/hapijs-status-monitor/commits?author=ziyasal "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/457834?v=4" width="75px;"/><br /><sub>Daniel Bayerlein</sub>](https://github.com/danielbayerlein)<br />[💻](https://github.com/ziyasal/hapijs-status-monitor/commits?author=danielbayerlein "Code") [⚠️](https://github.com/ziyasal/hapijs-status-monitor/commits?author=danielbayerlein "Tests") [📖](https://github.com/ziyasal/hapijs-status-monitor/commits?author=danielbayerlein "Documentation") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

Copyright (c) 2016-present [@ziyasal](https://github.com/ziyasal) & [@danielbayerlein](https://github.com/danielbayerlein).
See [LICENSE](./LICENSE.md) for details.
