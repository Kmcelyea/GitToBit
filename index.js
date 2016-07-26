var http = require('http');
var express = require('express');
var childprocess = require('child_process');


var app = express();
const PORT = 8080;
const exec = require('child_process').exec;

//We need a function which handles requests and send response
app.use(function(request, response, next) {
    try {
        //log the request on console
        console.log(request.url);
        next();
    } catch (err) {
        console.log(err);
    }

});

app.post("/execute", function(req, res) {
    exec('sh ./SyncBitGitScript.sh', function(error, stdout, stderr)
    {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
        res.end("Sync Failed");
      }
      res.end("Sync Complete");
    });
});

//Lets start our server
var server = app.listen(PORT, function () {
    var port = server.address().port;
    console.log('running on port :' + port)
});
