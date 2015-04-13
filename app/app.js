var express = require('express'); 
var app		= express(); 
var fs 		= require('fs'); 
var api 	= express.Router(); 
var request = require('request'); 

app.use(express.static(__dirname + '/public/')); 

var mainPage = fs.readFileSync(__dirname + '/public/index.htm'); 
var googleMaps = fs.readFileSync(__dirname + '/public/googlemaps.htm'); 

app.enable('trust proxy'); 

api.get('/photos', function(req,res){
	request
	  .get('https://api.vk.com/method/photos.search?v=5.29&count=100&lat=' + req.query.lat + '&long=' + req.query.long)
	  .on('error', function(err) {
	    console.log(err)
	  })
	  .pipe(res); 

	var data = [
		{
			name: 'test', 
			lat: 59.9225865755825,
			long: 30.36003440003231
		},
		{
			name: 'test2',
			lat: 59.9215865755825,
			long: 30.37003440003231
		},
	]
//	res.end(JSON.stringify(data))
}); 

api.get('*', function(req,res){
	res.status(404).json({error: 'no endpoint found'})
});

app.use('/api', api); 
app.get('/maps', function(req,res){
  res.end(googleMaps); 
}); 

app.get('*', function(req,res){
    res.end(req.ip); 
	res.end(mainPage);  
}); 

module.exports = app; 
