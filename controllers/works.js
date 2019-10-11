const mlab = require("../keys").mlab;
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${mlab.username}:${mlab.password}@ds151076.mlab.com:51076/score-study-app`;
const dbName = "score-study-app";

const worksController = {
  getAllWorks: (req, res) => {
    MongoClient.connect(url, async (err, client) => {
      const works = client.db(dbName).collection("works");
      const results = await works.find({}).toArray();

      res.send(results);
    });
  },

  getWorksByComposers: (req, res) => {
    const composers = req.body.composers;

    MongoClient.connect(url, async (err, client) => {
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

  createWork: (req, res) => {
    const work = req.body.work;
    MongoClient.connect(url, (err, client) => {
      const works = client.db(dbName).collection("works");
    //   works.insert_one
    });
  }
};

module.exports = worksController;
