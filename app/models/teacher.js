// grab the connection to the database
var db = require('../config/db.js');

// define our teacher model
// define teacher model interaction with database
exports.getAllByUser = function(userID, done) {
	db.get().query('SELECT * FROM teachers WHERE EmployeeID = ?', userID, function(error, rows) {
		if (error) return done(error)
		done(null, rows)
	});
}