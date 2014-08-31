var httpProxy = require('http-proxy'),
    serveStatic = require('serve-static'),
    connect   = require('connect'),
    endpoint  = {
      host:   '10tracks.com', // or IP address
      port:   443,
      prefix: '/api'
    },
    staticDir = 'public';

var proxy = new httpProxy.createProxyServer();
var app = connect()
  .use(serveStatic(__dirname + '/public'))
  .use(function(req, res) {
    if (req.url.indexOf(endpoint.prefix) === 0) {
      proxy.web(req, res, { target: 'https://10tracks.com' });
    }
  })
  .listen(8000);