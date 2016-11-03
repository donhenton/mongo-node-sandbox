//https://docs.mongodb.com/v3.2/reference/method/js-cursor/


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

testUsingForEach();
testUsingCount();
testUsingCursorLimit();

function testUsingCount()
{
    MongoClient.connect('mongodb://localhost:27017/restaurant_collection', function (err, db) {

        assert.equal(err, null);
        console.log("Successfully connected to MongoDB. 2");
 
        var counter =  db.collection('restaurants').find().count();
         counter.then( function(d) {
             assert.equal(d,97)
             db.close();
         })
         
    });
}

function testUsingForEach()
{
    MongoClient.connect('mongodb://localhost:27017/restaurant_collection', function (err, db) {

        assert.equal(err, null);
        console.log("Successfully connected to MongoDB. 1");

        var projection = {"name": 1, 'city': 1, "_id": 0}
        var counter = 0;
        var cursor = db.collection('restaurants').find()
        cursor.project(projection)

        db.collection('restaurants').find({}, projection).forEach(function (doc) {
            console.log(doc.name + " is in " + doc.city);
            counter++;


        }, function (err) {
            //this is both the finally block and the catch block
            assert.equal(counter, 97)
            assert.equal(err, null);
            return db.close();
        })




    });
}


function testUsingCursorLimit()
{
    MongoClient.connect('mongodb://localhost:27017/restaurant_collection', function (err, db) {

        assert.equal(err, null);
        console.log("Successfully connected to MongoDB. 3");

        var projection = {"name": 1, 'city': 1, "_id": 0}
        var counter = 0;
        var cursor = db.collection('restaurants').find({},projection)
        cursor.limit(5)

        cursor.forEach(function (doc) {
            console.log(doc.name + " is in " + doc.city);
            counter++;


        }, function (err) {
            //this is both the finally block and the catch block
            assert.equal(counter, 5)
            assert.equal(err, null);
            return db.close();
        })




    });
}




