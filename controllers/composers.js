const mlab = require("../keys").mlab;
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${mlab.username}:${mlab.password}@ds151076.mlab.com:51076/score-study-app`;
const dbName = "score-study-app";
const connectionSettings = {useNewUrlParser: true, useUnifiedTopology: true}

const composersController = {

    updateComposers: (req, res) => {
        /* 
        Finds all unique composers in the 'works' collection and formats and saves them to the composer collection
        */
        MongoClient.connect(url, connectionSettings, async (err, client) => {
            const works = client.db(dbName).collection('works');
            const allWorks = await works.find({}).toArray();
            let composers = allWorks.map(work => work.composer)
            composers = Array.from(new Set(composers)).map(c => {
                return {
                    composer: c,
                    displayName: c.split(",")[0],
                    period: null
                }
            })
            
            MongoClient.connect(url, connectionSettings, async () => {
                const composerCollection = client.db(dbName).collection("composers")
                await composerCollection.insertMany(composers)
                res.send(composers)
            })
        })
    },

    getAllComposers: (req, res) => {
        MongoClient.connect(url, connectionSettings, async (err, client) => {
            const composers = client.db(dbName).collection('works');
            const results = await composers.find({}).toArray();
            res.send(results);
        })
    },
    
    createComposer: (req, res) => {
        const composer = req.body
        MongoClient.connect(url, connectionSettings, async (err, client) => {
            const composers = client.db(dbName).collection('composers');
            composers.insertOne(composer)
        })
    }

}

module.exports = composersController;