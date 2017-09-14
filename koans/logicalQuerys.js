var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

testUsingOr();
testUsingAnd();
testIn();


//https://docs.mongodb.com/manual/reference/operator/query/#query-selectors

function testUsingOr()
{
    MongoClient.connect('mongodb://localhost:27017/restaurant_collection', function (err, db) {

        assert.equal(err, null);
        console.log("Successfully connected to MongoDB. or ");

        var query = {};
        query["$or"] = [{city: "Knoxville"}, {city: 'LA'}]
        var projection = {"name": 1, 'city': 1, "_id": 0}
        //projection = {}
        var counter = 0;
        var cursor = db.collection('restaurants').find(query)
        cursor.project(projection);



        cursor.forEach(function (doc) {
            // console.log(doc.name + " is in " + doc.city);
            // console.log(doc)
            counter++;


        }, function (err) {
            //this is both the finally block and the catch block
            assert.equal(counter, 3);
            assert.equal(err, null);
            return db.close();
        })




    });
}


function testUsingAnd()
{
    MongoClient.connect('mongodb://localhost:27017/restaurant_collection', function (err, db) {

        assert.equal(err, null);
        console.log("Successfully connected to MongoDB. and ");

        var query = {};
        query["$and"] = [{city: "Los Feliz"}, {state: 'CA'}]
        var projection = {"name": 1, 'city': 1, "_id": 0}
        projection = {}
        var counter = 0;
        var cursor = db.collection('restaurants').find(query)
        cursor.project(projection);



        cursor.forEach(function (doc) {
            // console.log(doc.name + " is in " + doc.city);
            //   console.log(doc)
            counter++;


        }, function (err) {
            //this is both the finally block and the catch block
            assert.equal(counter, 1);
            assert.equal(err, null);
            return db.close();
        })




    });
}


function testIn()
{
    MongoClient.connect('mongodb://localhost:27017/restaurant_collection', function (err, db) {

        assert.equal(err, null);
        console.log("Successfully connected to MongoDB. in ");

        // has a rating of two and its the only review
        var query = {};
        query["$and"] = [{"reviews.starRating": {'$in': [2]}}, {"reviews": {"$size": 1}}];

        var projection = {"name": 1, 'city': 1, "_id": 0};
        projection = {}
        var counter = 0;
        var cursor = db.collection('restaurants').find(query);
        cursor.project(projection);



        cursor.forEach(function (doc) {

            counter++;


        }, function (err) {
            //this is both the finally block and the catch block
            assert.equal(counter, 1);
            assert.equal(err, null);
            return db.close();
        })




    });
}

