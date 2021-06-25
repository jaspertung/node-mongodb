const MongoClient = require('mongodb').MongoClient
const assert = require('assert').strict
const dboper = require('./operations')

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
    
        //recreate campsites collection
        //const collection = db.collection('campsites') ----now accessing collection through db operations module
        
        //insert document into collection
        dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites', result => {
            console.log('Insert Document:', result.ops) // .ops short for operations, can contain different values depending on method (ex. contain array from document)
            
            dboper.findDocuments(db, 'campsites', docs => {//still inside callback function for .insertDocument, so not called until insertDocument function is finished
                //docs param contains found documents
                console.log('Found Documents:', docs)
                
                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description"}, 'campsites', result => {// 2)name arg acts as filter, module looks for field that matches name then will know which document (only 1) to update, 3) arg is info to update -> update description field, 4) collection name 5) inline callback function
                    console.log('Updated Document Count:', result.result.nModified)

                    dboper.findDocuments(db, 'campsites', docs => {
                        console.log('Found Documents:', docs)

                        dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites', result => {
                            console.log('Deleted Document Count:', result.deletedCount)

                            client.close() //close documentation to server
                        })
                    }) 
                })    
            })
        })
    })
}) 