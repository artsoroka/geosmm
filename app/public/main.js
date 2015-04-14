var calcDistance = function(coordinates){
	  var p1 = coordinates[0];
	  var p2 = coordinates[1]; 
      var R = 6371; // km
      var dLat = toRad(p2[0] - p1[0]);
      var dLon = toRad(p2[1] - p1[1]);
      var lat1 = toRad(p1[0]);
      var lat2 = toRad(p2[0]);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
var toRad = function(Value) {
        return Value * Math.PI / 180;
}

var getMedia = function(query, cb){
	var endpoint = '/api/photos'; 
	var queryString = []; 
	for(i in query){
		queryString.push([i, query[i]].join('=')); 
	}

	var xhr = new XMLHttpRequest()
	var url = [endpoint, queryString.join('&')].join('?'); 
	xhr.open('GET', url);
	xhr.onload = function(e){
		if(xhr.status != 200){
			return cb(JSON.parse(xhr.response).error, null); 		
		} 
		cb(false, JSON.parse(xhr.response)); 
	} 
	xhr.send(); 
}; 
