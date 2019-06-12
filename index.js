const MongoClient = require('mongodb').MongoClient; //node-module
const assert = require('assert');

const url = 'mongodb://localhost:27017/';//to start up a connection to the MongoDB server
const dbname = 'conFusion';//conFusion DB

//to access server
MongoClient.connect(url, (err, client) => {// err, client - is a callback wit h2 values

    assert.equal(err,null);//assert will check if error is equal to null, so the assert function allows us to perform various checks on values.

    console.log('Connected correctly to server');

    const db = client.db(dbname);//to connect to DB
    const collection = db.collection("dishes");//let us interact with dishes collection
    collection.insertOne({"name": "Uthappizza", "description": "test"},// inserting one object into the collection
    (err, result) => {// caLLBACK with 2 params: err and result
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);// 

        collection.find({}).toArray((err, docs) => {//will search for everything that is there in the collection, and then, provide that to us. Then, this can be converted to an array of JSON objects.
            assert.equal(err,null);
            
            console.log("Found:\n");
            console.log(docs);//all the documents in the collections will be returned

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);

                client.close();//will close the cpnnection to the DB
            });
        });
    });

});