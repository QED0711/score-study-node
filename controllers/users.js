const mlab = require("../keys").mlab;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const url = `mongodb://${mlab.username}:${mlab.password}@ds233268.mlab.com:33268/score-study-users`;
const dbName = "score-study-users";
const connectionSettings = { useNewUrlParser: true, useUnifiedTopology: true };

const bcrypt = require("bcrypt");
const salt = 10;

const usersController = {
  /* 
    :::::::::::::::::
    :: CREATE USER ::
    :::::::::::::::::
    */
  createUser: (req, res) => {
    const data = req.body;

    data.authorization = data.authorization || "standard";
    data.password = bcrypt.hashSync(data.password, salt);

    MongoClient.connect(url, connectionSettings, async (err, client) => {
      const userCollection = client.db(dbName).collection("users");

      const existingUsers = await userCollection
        .find({ username: data.username })
        .toArray();

      if (existingUsers.length) {
        res.send({ error: "Username already exists" });
      } else {
        let newUser = await userCollection.insertOne(data);
        newUser = newUser.ops[0];
        console.log(newUser);
        res.send({
          username: newUser.username,
          email: newUser.email,
          authorization: newUser.authorization,
          userID: newUser._id
        });
      }
    });
  },

  /* 
    ::::::::::::::::::
    :: SIGN IN USER ::
    ::::::::::::::::::
    */
  signInUser: (req, res) => {
    const data = req.body;
    MongoClient.connect(url, connectionSettings, async (err, client) => {
      const userCollection = client.db(dbName).collection("users");

      const existingUser = await userCollection.findOne({
        username: data.username
      });

      if (
        existingUser &&
        bcrypt.compareSync(data.password, existingUser.password)
      ) {
        res.send({
          username: existingUser.username,
          userID: existingUser._id,
          authorization: existingUser.authorization,
          email: existingUser.email
        });
      } else {
        res.send({ error: "Username or Password Incorrect" });
      }
    });
  },

  /* 
    :::::::::::::::::
    :: DELETE USER ::
    :::::::::::::::::
    */

  deleteUser: (req, res) => {},

  /* 
  ::::::::::::::::::::::::::
  :: CHANGE USER PASSWORD ::
  ::::::::::::::::::::::::::
  */

  changePassword: (req, res) => {
    const data = req.body;

    MongoClient.connect(url, connectionSettings, async (err, client) => {
      const userCollection = client.db(dbName).collection("users");

      const existingUser = await userCollection.findOne({
        _id: new ObjectID(data.userID),
        username: data.username
      });

      if (
        existingUser &&
        bcrypt.compareSync(data.currentPassword, existingUser.password)
      ) {
        await userCollection.updateOne(
          { _id: existingUser._id },
          { $set: { password: bcrypt.hashSync(data.newPassword, salt) } }
        );
        res.send(existingUser._id);
      } else {
        res.send({ error: "incorrect credentials" });
      }
    });
  },

  /* 
  :::::::::::::::::::::::
  :: CHANGE USER EMAIL ::
  :::::::::::::::::::::::
  */

  changeEmail: (req, res) => {
    const data = req.body;
    console.log(data);
    MongoClient.connect(url, connectionSettings, async (err, client) => {
      const userCollection = client.db(dbName).collection("users");

      const existingUser = await userCollection.findOne({
        _id: new ObjectID(data.userID)
        // username: data.username
      });

      console.log(typeof existingUser._id);

      if (existingUser) {
        await userCollection.updateOne(
          { _id: existingUser._id },
          { $set: { email: data.email } }
        );
        res.send({
          username: existingUser.username,
          email: data.email,
          authorization: existingUser.authorization,
          userID: existingUser._id
        });
      } else {
        res.send({ error: "no user found with those credentials" });
      }
    });
  }
};

module.exports = usersController;
