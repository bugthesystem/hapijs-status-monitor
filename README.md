
# hapijs-status-monitor
Simple, self-hosted module based on Socket.io and Chart.js to report realtime server metrics for Hapi.js servers. More Node frameworks coming soon.

**Inspired from [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor)**

## Installation & setup
1. Run `npm install hapijs-status-monitor --save`

2. Register plugin `server.register({ register: require('./plugin')});`
3. Run server and go to `/status`

## Options

Monitor can be configured by passing options object into  server register method 
`server.register({ register: require('./plugin'), options:{}});` .
 
Default config:
```
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
}]

```

## License

[MIT License](https://opensource.org/licenses/MIT) © ziyasal
