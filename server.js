"use sctrict";

const mlab = require("./keys").mlab;

// CONTROLLERS
const worksController = require('./controllers/works');
const composersController = require('./controllers/composers');

// EXPRESS SETUP
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running: " + `http://localhost:${port}`);
});

// ROUTES
// works
app.get("/works", worksController.getAllWorks)
app.get("/composer-works", worksController.getWorksByComposers)
// app.post("/works", worksController.createWork)

// composers
app.get("/composers", composersController.getAllComposers)
app.post("/composers", composersController.createComposer)

// users

// comments