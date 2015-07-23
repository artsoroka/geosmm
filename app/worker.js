var request = require('request'); 
var db 		= require('./lib/mysql'); 

var apiBaseUrl = 'https://api.vk.com/method'; 
var method     = 'photos.search'; 

var prepareQuery = function(params){
	var query = []; 
	for(p in params){
		query.push( [p, params[p]].join('=') );
	}
	return query.join('&');  	
}

var query      = prepareQuery({
	v: '5.35', 
	lat: 59,
	long: 30, 
	radius: 5000, 
	count: 1000
}); 

var url = [[apiBaseUrl, method].join('/'),query].join('?');   

console.log(url); 

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

request.post(url, handler); 