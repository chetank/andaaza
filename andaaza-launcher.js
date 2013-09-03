// My SocketStream 0.3 app

var http = require('http'),
    fs = require('fs'),
    ss = require('socketstream');

// Define a single-page client called 'main'
ss.client.define('main', {
    view: 'app.html',
    css:  ['style.css','bootstrap.min.css','jquery-ui-1.10.3.custom.css'],
    code: ['libs/jquery.min.js','libs/jquery-ui-1.10.3.custom.js','app'],
    tmpl: '*'
});

// Serve this client on the root URL
ss.http.route('/', function(req, res){
    res.serveClient('main');
});

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets();

// Start web server
//var server = http.Server(options, ss.http.middleware);
var server = http.Server(ss.http.middleware);
server.listen(8080);

// Start SocketStream
ss.start(server);
