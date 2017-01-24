// allows us to call database in server.js using "db.url"
var mysql = require('mysql');

// config for MYSQL 
var pool = mysql.createPool({
	host: process.env.SERVER,
	user: process.env.DEVELOPMENT_ID,
	password: process.env.DEVELOPMENT_SECRET,
	database: process.env.DB_ID,
	connectionLimit: 10 
});

exports.getUser = function(request, callback){
	var sql = process.env.TEST_QUERY;
	pool.getConnection(function(err, connection){
		if (err) {
			//console.log(err);
			 console.log('not connected');
		}
		connection.query(sql, function(err, rows, done){
			if(err){
				//connection.release();
				console.log('error in DB THIS TIME');				
			} else{
				console.log(rows);
				connection.release();
				return rows;
			}
		});
	});
}
