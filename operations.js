//implementing Node module operations
//4 methods to insert, find, remove, and update documents
//const assert = require('assert').strict --------not using assert anymore

exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection) //expecting string from collection arg (ex. "campsites") then use string as arg in db.collection method to get reference to method named campsites in mongodb server ---------------- aka can use coll to interact with specific collection in mongodb server
    return coll.insertOne(document) //automatically returns value as a promise if no callback called
    // coll.insertOne(document, (err, result) => {
    //     assert.strictEqual(err, null)
    //     callback(result) //callback that is defined somewhere else and now delivering the results to the callback
    // })
}
exports.findDocument = (db, collection) => {
    const coll = db.collection(collection)
    return coll.find().toArray
}
exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection)
    return coll.deleteOne(document)
}
exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection)
    return coll.updateOne(document, { $set: update }, null) // $set: lets mongodb know we want to write over existing info
}