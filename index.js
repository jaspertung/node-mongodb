const MongoClient = require('mongodb').MongoClient
const assert = require('assert').strict

const url = 'mongodb://localhost:27017/' //port number
const dbname = 'nucampsite' //name of database we want to connect to

//connect to server
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => { //connect MongoClient with Mongo server, enables update of Topology layer of Mongo Driver
    //check that error isn't null
    assert.strictEqual(err, null) //1st arg: value being checked, 2nd arg: expected value
    //if err === null, continue
    //if err !== null, fail and terminate application
    console.log('Connected correctly to server') //server = mongodb database
    
    const db = client.db(dbname) //connect to nucampsite database in mongodb server and allow interactivity
    //delete all documents in campsites collection (start with fresh collection each time for testing)
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null)
        console.log('Dropped Collection', result)
    })
    
    //recreate campsites collection
    const collection = db.collection('campsites')
    
    //insert document into collection
    collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
    (err, result) => {
        assert.strictEqual(err, null)
        console.log('Insert Document:', results.ops) // .ops short for operations, can contain different values depending on method (ex. contain array from document)
       
        //print documents in collection
        collection.find().toArray((err, docs) => { //convert documents to array of objects so can console.log
            assert.strictEqual(err, null)
            console.log('Found Documents:', docs)

            client.close() //close documentation to server
        }) 
    })
}) 