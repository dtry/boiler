const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const SOUNDCLOUD_PROXY_URL = 'https://api-v2.soundcloud.com';
const PROD = false;
const PORT = PROD ? 8080 : 3030;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET');

  next();
});

app.get('/search/queries', proxy(SOUNDCLOUD_PROXY_URL, {
  https: true,
  proxyReqPathResolver: function (req) {
    return require('url').parse(req.url).path;
  }
}));

app.get('/search/tracks', proxy(SOUNDCLOUD_PROXY_URL, {
  https: true,
  proxyReqPathResolver: function (req) {
    return require('url').parse(req.url).path;
  }
}));

app.get('*', function (req, res) {
  res.sendfile(__dirname + '/dist/index.html')
});

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default
app.listen(PORT);
