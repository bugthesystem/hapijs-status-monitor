
# hapijs-status-monitor
Simple, self-hosted module based on Socket.io and Chart.js to report realtime server metrics for Hapi.js servers. 

**Inspired from [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor)**


![](https://raw.githubusercontent.com/ziyasal/hapijs-status-monitor/master/misc/fun.png)  

## Installation & setup
1. Run `npm install hapijs-status-monitor --save`

2. Register plugin `server.register({ register: require('hapijs-status-monitor')});`
3. Run server and go to `/status`

_**To send requests locally**_
```sh
 while sleep 1; do curl http://localhost:8000/hello; done
```

## Options

Monitor can be configured by passing options object into  server register method  
```js
server.register({ register: require('hapijs-status-monitor'), options:{}})
```
 
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
