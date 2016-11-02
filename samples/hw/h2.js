var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/students', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    var query = {"grade": 1};

    var cursor = db.collection('students').find() 
    cursor.skip(6)
    cursor.limit(2)
    cursor.sort(query)
    cursor.forEach(function(doc){
         console.log( doc.student + " grade " + doc.grade );
         
    }, function(err) {
        assert.equal(err, null);
        return db.close();
    })
       
 
        
    

});