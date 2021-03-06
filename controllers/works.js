const mlab = require("../keys").mlab;
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${mlab.username}:${mlab.password}@ds151076.mlab.com:51076/score-study-app`;
const dbName = "score-study-app";
const connectionSettings = { useNewUrlParser: true, useUnifiedTopology: true }

const worksController = {
  getAllWorks: (req, res) => {
    MongoClient.connect(url, connectionSettings, async (err, client) => {
      const works = client.db(dbName).collection("works");
      const results = await works.find({}).toArray();

      res.send(results);
    });
  },

  getWorksByComposers: (req, res) => {
    const composers = req.body.composers;

    MongoClient.connect(url, connectionSettings, async (err, client) => {
      const works = client.db(dbName).collection("works");
      let results = [];
      let currentComposer;

      for (let c of composers) {
        currentComposer = await works.find({ composer: c }).toArray();
        results.push(...currentComposer);
      }

      res.send(results);
    });
  },

  getWorkByID: (req, res) => {

    const { body } = req;

    MongoClient.connect(url, connectionSettings, async (err, client) => {
      const works = client.db(dbName).collection("works");

      const selectedWork = await works.findOne({_id: body.workID})

      if (selectedWork){
        res.send(selectedWork)
      } else {
        res.send(null)
      }
    
    });

  },

  createWork: (req, res) => {
    const work = req.body.work;
    // write a function, formatWork, to put work into correct saving format
    // work = formatWork(work)
    MongoClient.connect(url, (err, client) => {
      const works = client.db(dbName).collection("works");
      //   works.insertOne(work)
    });
  }
};

module.exports = worksController;
