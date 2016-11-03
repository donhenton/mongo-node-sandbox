var MongoClient = require('mongodb').MongoClient,
        assert = require('assert');

//https://docs.mongodb.com/manual/reference/operator/query/#query-selectors
MongoClient.connect('mongodb://localhost:27017/restaurant_collection', function (err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    //var query = {"name":  new RegExp('ocean*','i') };
    var query = {"name": {"$regex": 'ocean*', "$options": "i"}};
    var cursor = db.collection('restaurants').find(query)
    var projection = {"name": 1, 'city': 1, "_id": 0}
    cursor.project(projection)
    var counter = 0;
    cursor.forEach(function (doc) {
        console.log(doc.name + " is in " + doc.city);
        counter++;
        console.log(counter)
        if (counter > 2)
        {
            throw new Error("should only get two")
        }
    }, function (err) {
        //this is both the finally block and the catch block
        assert.equal(err, null);
        return db.close();
    })




});
