/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
// create a new express server
var app = express();
var http = require('http');
var server = http.createServer(app);
var request = require('request');
var bodyParser = require('body-parser');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');



// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});



// var request = require('request'),
// username = "wnsumbefulancienceristay",
// password = "0b2b1532a907575767b0b8bd0d7a1474fb2c8c87",
// url = "http://" + username + ":" + password + "@fd71d5de-2f81-4fb8-a50e-0527b8402aae-bluemix.cloudant.com/applicant_details/_all_docs?include_docs=true",;

// request(
// {
//     url : url
// },
// function (error, response, body) {
//   let json = JSON.parse(body);
//   console.log(json);
// }
// );


//loads env files to process.env
require('dotenv').config();
var url = process.env.APIURL;
var username = process.env.USERNAME;
var password = process.env.PASSWORD;


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/sendinfo', function(req, res) {
  console.log("REQ BODY: " + req.body);
  
  request.post({
    headers: {'content-type' : 'application/json'},
    url:     'http://' + username + ':' + password + '@' + url,
    json: req.body
  }, function(error, response, body){
    console.log(body);
    res.redirect('/sent.html');
  });
  
});

// server.listen(process.env.PORT, process.env.IP);