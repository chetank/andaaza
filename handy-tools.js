// My SocketStream 0.3 app

var http = require('http'),
    fs = require('fs'),
    ss = require('socketstream');

var nodemailer = require("nodemailer");

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
    code: ['libs/jquery.min.js','libs/jquery-ui-1.10.3.custom.js','libs/json2.js','app/discovery.js'],
    tmpl: '*'
});

// Serve this client on the root URL
ss.http.route('/andaaza', function(req, res){
    req.on('data', function(data) {
        console.log("Received form data from client i.e. browser:");
        console.log(data.toString());

        // parse the report as a CSV string
        var csvString = "Story Title,Task Title,Best Estimate, Likely Estimate, Worst Estimate, Avg. Estimate, Std. Dev., 95% Confidence Estimate\n";
        var arr = data.toString().split("&");
        var reportTitle = "";
        var emailAddress = "";

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
                case "reportTitle":
                    reportTitle = val;
                    break;
                case "emailAddress":
                    emailAddress = val;
                    break;
                default :
                    csvString = csvString + "," + val;
            }
        }

        //write the report to output socket
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(csvString);
        res.end();

        console.log("emailAddress");

        //e-mail the report to provided e-mail address with subject as report title

        var transport = nodemailer.createTransport("Sendmail");

        /*
        var mailOptions = {
            from: "chetankumar.iisc@gmail.com",
            to: emailAddress,
            subject: "Your 3 Point Estimates Report: " + reportTitle,
            text: "Plaintext body",
            attachments: [
                {   // define custom content type for the attachment
                    fileName: "report",
                    contents: csvString,
                    contentType: "text/plain"
                }
            ]
        }
        transport.sendMail(mailOptions);
        */

        transport.sendMail({
            from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
            to: emailAddress, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world ✔", // plaintext body
            html: "<b>Hello world ✔</b>" // html body
        }, console.error);

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
