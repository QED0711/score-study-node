const mlab = require("../keys").mlab;
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${mlab.username}:${mlab.password}@ds151076.mlab.com:51076/score-study-app`;
const dbName = "score-study-app";

const composersController = {

    getAllComposers: (req, res) => {
        MongoClient.connect(url, async (err, client) => {
            const composers = client.db(dbName).collection('composers');
            const results = await composers.find({}).toArray();
            res.send(results);
        })
    },
    
    createComposer: (req, res) => {
        const composer = req.body
        MongoClient.connect(url, async (err, client) => {
            const composers = client.db(dbName).collection('composers');
            composers.insertOne(composer)
        })
    }

}

module.exports = composersController;