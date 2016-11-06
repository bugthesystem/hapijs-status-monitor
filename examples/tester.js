const request = require('request');

const requestUrl = 'http://localhost:8000/return-status/';
const interval = 50;

const makeDummyCall = () => setTimeout(() => {
  const code = parseInt(200 + (Math.random() * 399), 10);
  request.get(`${requestUrl}${code}`);
  makeDummyCall();
}, interval);

makeDummyCall();
