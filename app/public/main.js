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

var showImagesOnMap = function(map){
	return function(err,data){
                
		if( err ) return console.log('could not get data'); 

		data.response.items.forEach(function(item){
        	var myLatlng = new google.maps.LatLng(item.lat, item.long);
                
            var contentString = 
            	'<div>'+
                '<img src="' + item.photo_604 +'">' + 
                '<a href="http://vk.com/id' + item.owner_id + '">Author</a>' + 
                '</div>'
        	
            var createLink = function(user_id){
            	var id = user_id.toString(); 
            	var userType = ( id.split('')[0] == '-') ? 'club' : 'id'; 
            	return 'http://vk.com/' + userType + id.replace('-','');             	
            }



        	contentString =  "<div><div style='float:left;'>" +
                    '<a href="' + createLink(item.owner_id) + '">Author</a>' + 
                    "New Delhi is the capital of the Republic of India, <br>" +
                    "and the seat of executive, legislative, and judiciary <br>" +
                    "branches of the Government of India. It also serves <br>" +
                    "as the centre of the Government of the National <br>" +
                    "Capital Territory of Delhi.<a href='http://en.wikipedia.org/wiki/New_Delhi' " +
                    "style='text-decoration:none;color:#cccccc;font-size:10px;'> Wikipedia</a>" +
                    "</div><div style='float:right; padding:5px;'><img src='" +
                    item.photo_130 +"'>" +
                    "</img></div></div>";


        	var marker = new google.maps.Marker({
            	position: myLatlng,
                map: map,
                icon: '/vk32.png',   
                title: 'Hello World!'
            }); 

        	var infowindow = new google.maps.InfoWindow({
            	content: contentString
            });

            google.maps.event.addListener(marker, 'click', function() {
            	infowindow.open(map,marker);
            });

            google.maps.event.addListener(marker, 'mouseover', function() {
            	console.log('about to click'); 
            });

        });

    }
}
