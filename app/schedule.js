var request    = require('request'); 
var addPhoto   = require('./lib/photos'); 
var apiBaseUrl = 'https://api.vk.com/method'; 
var method     = 'photos.search'; 

var locations = {
	spb: {lat: 59.90, lng: 30.33}, 
	msk: {lat: 55.80, lng: 37.62}
}

var prepareQuery = function(params){
	var query = []; 
	for(p in params){
		query.push( [p, params[p]].join('=') );
	}
	return query.join('&');  	
}

var getPhotos = function(location){

	var query = prepareQuery({
		v: '5.35', 
		lat: location.lat, 
		long: location.lng,  
		radius: 50000, 
		count: 1000 
	});	
	var url = [[apiBaseUrl, method].join('/'),query].join('?');   

	console.log('URL: ', url); 
	
	request.get(url, function(err, response, body){
		if(err) return console.log('ERR: ', err); 

		if(response.statusCode != 200) 
			return console.log('status not OK: ', response, body); 

		console.log('successfuly made request'); 

		var data = JSON.parse(body); 
		
		if( ! data || ! data.response ) 
			return console.log('no data'); 
		
		console.log('total: ', data.response.count); 
		console.log('contains:', data.response.items.length); 
		
		data.response.items.map(function(item){
			addPhoto(item); 
		}); 

	}); 

};  

setInterval(function(){
	getPhotos(locations['spb']); 
	getPhotos(locations['msk']); 
}, 3000);  