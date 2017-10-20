const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/timetabledb";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	console.log("Connected to database!");

	db.createCollection('users', function(err, res) {
		if (err) throw err;
		console.log('Collection Created!');
		db.close();
	});
});