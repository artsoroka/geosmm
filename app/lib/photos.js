var redis = require('redis').createClient(); 
var db    = require('./mysql'); 

var indexedPhotos = 'vkphotos'; 

var checkIndex = function(photoId, cb){
	redis.sismember(indexedPhotos, photoId, function(err, isIndexed){
		if( err ) return console.log('redis err: ', err); 
		cb(isIndexed); 
	}); 
}

var updateDatabase = function(data){
	db.query('INSERT INTO photos SET ?', {
		photo_id : data.id, 
		user_id  : data.owner_id, 
		album_id : data.album_id, 
		lat      : data.lat, 
		lng		 : data.long, 
		img      : data.photo_1280, 
		img_xs   : data.photo_75,  
		img_s    : data.photo_130,  
		img_m    : data.photo_604,  
		img_l    : data.photo_807,  
		timestamp: data.date 			
	}, function(err, info){
		if( err ) return console.log('db err: ', err); 
	}); 
}

module.exports = function(newRecord){
	checkIndex(newRecord.id, function(isIndexed){
		if( isIndexed ) return; 

		redis.sadd(indexedPhotos, newRecord.id); 
		updateDatabase(newRecord); 
	}); 
}