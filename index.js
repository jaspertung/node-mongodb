const MongoClient = require('mongodb').MongoClient
//const assert = require('assert').strict -------not using assert anymore
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/' //port number
const dbname = 'nucampsite' //name of database we want to connect to

//connect to server
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => { //connect MongoClient with Mongo server, enables update of Topology layer of Mongo Driver
    //check that error isn't null
    //assert.strictEqual(err, null) //1st arg: value being checked, 2nd arg: expected value ----replaced with catch method
    //if err === null, continue
    //if err !== null, fail and terminate application
    console.log('Connected correctly to server') //server = mongodb database
    
    const db = client.db(dbname) //connect to nucampsite database in mongodb server and allow interactivity
    //delete all documents in campsites collection (start with fresh collection each time for testing)
    db.dropCollection('campsites')
    .then(result => {
        console.log('Dropped Collection', result)
    })
    .catch(err => console.log('No collection to drop.'))
    
    //recreate campsites collection
    
    //insert document into collection
    dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites') 
    .then (result => { //now holds result of promise
        console.log('Insert Document:', result.ops) // .ops short for operations, can contain different values depending on method (ex. contain array from document)
            
        return dboper.findDocuments(db, 'campsites')
    })
    .then (docs => {//still inside callback function for .insertDocument, so not called until insertDocument function is finished
        //docs param contains found documents
        console.log('Found Documents:', docs)
                
        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description"}, 'campsites') // 2)name arg acts as filter, module looks for field that matches name then will know which document (only 1) to update, 3) arg is info to update -> update description field, 4) collection name 5) inline callback function
    })
    .then (result => {
        console.log('Updated Document Count:', result.result.nModified)

        return dboper.findDocuments(db, 'campsites')
    })
    .then (docs => {
        console.log('Found Documents:', docs)

        return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites')
    })
    .then (result => {
        console.log('Deleted Document Count:', result.deletedCount)

        return client.close() //close documentation to server
    })
    .catch(err => {
        console.log(err)
        client.close()
    })
}) 
.catch(err => console.log(err)) //catch if MnogoClient doesn't connect