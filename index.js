const MongoClient = require('mongodb').MongoClient; //node-module
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';//to start up a connection to the MongoDB server
const dbname = 'conFusion';//conFusion DB

//to access server
MongoClient.connect(url, (err, client) => {// err, client - is a callback wit h2 values

    assert.equal(err,null);//assert will check if error is equal to null, so the assert function allows us to perform various checks on values.

    console.log('Connected correctly to server');


    const db = client.db(dbname);//to connect to DB
    
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
    "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);//OPS tells you the number of insert operations that were carried out

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, { name: "Vadonut" },
                { description: "Updated Test" }, "dishes",
                (result) => {
                    console.log("Updated Document:\n", result.result);

                    dboper.findDocuments(db, "dishes", (docs) => {
                        console.log("Found Updated Documents:\n", docs);
                        
                        db.dropCollection("dishes", (result) => {
                            console.log("Dropped Collection: ", result);

                            client.close();
                        });
                    });
                });
        });
});

});