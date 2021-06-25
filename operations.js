//implementing Node module operations
//4 methods to insert, find, remove, and update documents
const assert = require('assert').strict

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection) //expecting string from collection arg (ex. "campsites") then use string as arg in db.collection method to get reference to method named campsites in mongodb server ---------------- aka can use coll to interact with specific collection in mongodb server
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null)
        callback(result) //callback that is defined somewhere else and now delivering the results to the callback
    })
}
exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection)
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null)
        callback(docs)
    })
}
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection)
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null)
        callback(result)
    })
}
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection)
    coll.updateOne(document, { $set: update }, null, (err, result) => { // $set: lets mongodb know we want to write over existing info
        assert.strictEqual(err, null)
        callback(result)
    })
}