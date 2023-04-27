module.exports = {
  title: 'hapi.js Status',
  path: '/status',
  base: '/',
  spans: [
    {
      interval: 1,
      retention: 60,
      responses: [],
    },
    {
      interval: 5,
      retention: 60,
      responses: [],
    },
    {
      interval: 15,
      retention: 60,
      responses: [],
    },
  ],
  websocket: null,
  routeConfig: {}, // https://github.com/hapijs/hapi/blob/master/API.md#route-options
};
