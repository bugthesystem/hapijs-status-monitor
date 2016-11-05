module.exports = {
  title: 'hapi.js Status',
  path: '/status',
  spans: [
    {
      interval: 1,
      retention: 60,
    },
    {
      interval: 5,
      retention: 60,
    },
    {
      interval: 15,
      retention: 60,
    },
  ],
  routeConfig: {}, // https://github.com/hapijs/hapi/blob/master/API.md#route-options
};
