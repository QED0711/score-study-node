"use sctrict";

const mlab = require("./keys").mlab;

// EXPRESS SETUP
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running: " + `http://localhost:${port}`);
});

// DATABASE SETUP
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${mlab.username}:${mlab.password}@ds151076.mlab.com:51076/score-study-app`;
const dbName = "score-study-app";

// ROUTES
app.get("/composers", (req, res) => {
  MongoClient.connect(url, async (err, client) => {
    const composers = client.db(dbName).collection("composers");
    const results = await composers.find({}).toArray();

    res.send(results);
  });
});

app.post("/works", (req, res) => {
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
});
