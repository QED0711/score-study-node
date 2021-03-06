"use sctrict";

// const mlab = require("./keys").mlab;
// const bodyParser = require("body-parser")

// CONTROLLERS
const worksController = require('./controllers/works');
const composersController = require('./controllers/composers');
const usersController = require('./controllers/users');
const commentsController = require('./controllers/comments');

// EXPRESS SETUP
const express = require("express");
const cors = require('cors')
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running: " + `http://localhost:${port}`);
});

// ROUTES
// works
app.get("/works", worksController.getAllWorks)
app.post("/composer-works", worksController.getWorksByComposers)
app.post("/work", worksController.getWorkByID)
// app.post("/works", worksController.createWork)

// composers
app.get("/composers", composersController.getAllComposers)
app.post("/composers/update", composersController.updateComposers)
app.post("/composers", composersController.createComposer)

// users
app.post("/users/create", usersController.createUser)
app.post("/users/sign-in", usersController.signInUser)
app.post("/users/change-email", usersController.changeEmail)
app.post("/users/change-password", usersController.changePassword)

// comments
app.post("/comments/create", commentsController.createComment)
app.post("/comments/user-comments", commentsController.getUserComments)
app.post("/comments/user-work-comments", commentsController.getUserCommentsOnWork)
app.post("/comments/work-comments", commentsController.getWorkComments)
app.post("/comments/edit-comment", commentsController.editComment)
app.post("/comments/delete-comment", commentsController.deleteComment)