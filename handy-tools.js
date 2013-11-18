// My SocketStream 0.3 app

var http = require('http'),
    fs = require('fs'),
    ss = require('socketstream');

ss.client.define('andaaza', {
    view: 'andaaza.html',
    css:  ['style.css','bootstrap.min.css','jquery-ui-1.10.3.custom.css'],
    code: ['libs/jquery.min.js','libs/jquery-ui-1.10.3.custom.js','libs/json2.js','app'],
    tmpl: '*'
});

// Define a single-page client called 'main'
ss.client.define('discovery', {
    view: 'discovery.html',
    css:  ['style.css','bootstrap.min.css','jquery-ui-1.10.3.custom.css'],
    code: ['libs/jquery.min.js','libs/jquery-ui-1.10.3.custom.js','libs/json2.js','app'],
    tmpl: '*'
});

// Serve this client on the root URL
ss.http.route('/andaaza', function(req, res){
    req.on('data', function(data) {
        console.log("Received body data:");
        console.log(data.toString());

        // save report in s3

        // e-mail report as csv file
        var csvString = "";
        var arr = data.toString().split("&");
        for(var i=0;i<arr.length;i++) {

            var label = arr[i].split("=")[0];
            var val = arr[i].split("=")[1];

            switch (label){
                case "story-title":
                    csvString = csvString + val;
                    break;
                case "task-title":
                    csvString = csvString + "," + val;
                    break;
                case "cfd":
                    csvString = csvString + "," + val + "\n";
                    break;
                case "tbe":
                    csvString = csvString + "Total,," + val;
                    break;
                default :
                    csvString = csvString + "," + val;
            }
        }

        console.log(csvString);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(csvString);
        res.end();

        // list all past reports by user

        // delete/update past reports by user
    });
    res.serveClient('andaaza');
});

// Serve this client on the root URL
ss.http.route('/discovery', function(req, res){
    req.on('data', function(data) {});
    res.serveClient('discovery');
});

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets();

// Start web server
//var server = http.Server(options, ss.http.middleware);
var server = http.Server(ss.http.middleware);

server.listen(80);

// Start SocketStream
ss.start(server);
