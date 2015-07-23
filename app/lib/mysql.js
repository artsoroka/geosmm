var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'geosmm',
  password : '',
  database : 'geosmm'
});

connection.connect();

module.exports = connection; 