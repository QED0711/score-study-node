const mongoose = require("mongoose");
const mlab = require("./keys").mlab;
const url = `mongodb://${mlab.username}:${mlab.password}@ds151076.mlab.com:51076/score-study-app`;

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection

module.exports = db;
