var express = require('express'); 
var app		= express(); 
var fs 		= require('fs'); 

app.use(express.static(__dirname + '/public/')); 

var mainPage = fs.readFileSync(__dirname + '/public/index.htm'); 

app.get('/', function(req,res){
	res.end(mainPage);  
}); 

module.exports = app; 