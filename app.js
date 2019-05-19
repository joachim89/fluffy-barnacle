// const http = require("http"),
//     fs = require("fs");
// const port=process.env.PORT || 3000
// fs.readFile("./index.html", function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(port, function () {
//         console.log("Server ut på port: " + port);
//        });
// });



var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
const port=process.env.PORT || 3000

// Serve up public/ftp folder
var serve = serveStatic('./', {'index': ['index.html', 'index.htm']})

// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(port, function () {
            // console.log("Server ut på port: " + port);
     });