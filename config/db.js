// allows us to call database in server.js using "db.url"
var mysql = require('mysql')
	, async = require('async');

var PRODUCTION_DB = 'app_prod_database'
	, TEST_DB = 'app_test_database';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
	pool: null,
	mode: null
};

exports.connect = function(mode, done) {
	state.pool = mysql.createPool({
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE
	});
	state.mode = mode;
	done();
};

exports.get = function() {
	return state.pool;
};