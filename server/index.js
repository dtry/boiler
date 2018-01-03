const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const path = require('path');

app.use(express.static('../dist'));

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

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 8080);
