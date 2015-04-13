var express = require('express'); 
var server  = express(); 
var app     = require('./app/app.js'); 
var port    = process.env.GEOSMM_PORT || 8080;  

server.enable('trust proxy'); 

server.use(function(req,res,next){
  console.log('CLIENT IP: ' + req.ip ); 
  next(); 
}); 

server.use('/', app); 

server.listen(port);  
console.log('app is listening on a port: ' + port); 
