const express = require('express');
const app = express();
const path = require('path');
const proxy = require('express-http-proxy');
const SOUNDCLOUD_PROXY_URL = 'https://api-v2.soundcloud.com';

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET');

  next();
});

// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

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
  res.sendFile(__dirname + '/dist/index.html')
});

// Start the app by listening on the default
app.listen(process.env.port || 3030);
