const express = require('express');
const app = express();
const proxy = require('express-http-proxy');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET');

  next();
});

app.get('/search/queries', proxy('https://api-v2.soundcloud.com', {
  https: true,
  proxyReqPathResolver: function (req) {
    return require('url').parse(req.url).path;
  }
}));

app.get('/search/tracks', proxy('https://api-v2.soundcloud.com', {
  https: true,
  proxyReqPathResolver: function (req) {
    return require('url').parse(req.url).path;
  }
}));

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
