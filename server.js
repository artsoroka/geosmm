var app = require('./app/app.js'); 
var port = process.env.GEOSMM_PORT || 8080;  

app.listen(port);  
console.log('app is listening on a port: ' + port); 