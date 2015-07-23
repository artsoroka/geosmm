var request    = require('request'); 
var db 		   = require('./lib/mysql'); 
var INTERVAL   = 1000; 
var apiBaseUrl = 'https://api.vk.com/method'; 
var method     = 'photos.search'; 

var prepareQuery = function(params){
	var query = []; 
	for(p in params){
		query.push( [p, params[p]].join('=') );
	}
	return query.join('&');  	
}

var handler = function(err, response, body){
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

		db.query('INSERT INTO photos SET ?', {
			photo_id: item.id, 
			album_id: item.album_id, 
			owner_id: item.owner_id,  
			lat: item.lat, 
			long: item.long
		}, function(err, result){
			if(err) return console.log(err); 
			console.log(result); 
		}); 

	}); 

}

var getPhotos = function(offset, timeStart, requestNumber){
	
	if(offset >= 100000) return console.log('finished'); 

	timeStart = timeStart || Date.now();
	var currentTime = Date.now(); 
	requestNumber = requestNumber || 1;
	requestNumber++;
	console.log('current offset: ', offset); 

	var query      = prepareQuery({
		v: '5.35', 
		lat: 59.92,
		long: 30.25, 
		radius: 50000, 
		count: 1000, 
		offset: offset
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
		//console.log('DATA', body); 
		console.log('total: ', data.response.count); 
		console.log('contains:', data.response.items.length); 
		if( ! data.response.items.length )
			console.log(body); 
		data.response.items.map(function(item){

			db.query('INSERT INTO photos SET ?', {
				photo_id: item.id, 
				album_id: item.album_id, 
				owner_id: item.owner_id,  
				lat: item.lat, 
				long: item.long
			}, function(err, result){
				if(err) return console.log(err); 
				//console.log(result); 
			}); 

		}); 
		offset += 1000; 
	    if(requestNumber <= 5) return getPhotos(offset, timeStart, requestNumber);

	    console.log('should wait a moment');
	    setTimeout(function(){
	      getPhotos(offset);
	    }, timeStart + INTERVAL - currentTime);

	}); 

};  

getPhotos(3000); 