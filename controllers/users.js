const mlab = require("../keys").mlab;
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${mlab.username}:${mlab.password}@ds233268.mlab.com:33268/score-study-users`;
const dbName = "score-study-users";
const connectionSettings = { useNewUrlParser: true, useUnifiedTopology: true };

const usersController = {
  /* 
    :::::::::::::::::
    :: CREATE USER ::
    :::::::::::::::::
    */
  createUser: (req, res) => {
    const data = req.body;
    data.authorization = data.authorization || "standard";
    MongoClient.connect(url, connectionSettings, async (err, client) => {
      const userCollection = client.db(dbName).collection("users");

      const existingUsers = await userCollection
        .find({ username: data.username })
        .toArray();

      if (existingUsers.length) {
        res.send({ error: "Username already exists" });
      } else {
        await userCollection.insertOne(data);
        res.send(data);
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
        username: data.username,
        password: data.password
      });

      if (existingUser) {
        res.send({
          username: existingUser.username,
          userID: existingUser._id,
          authorization: existingUser.authorization
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
          const userCollection = client.db(dbName).collection('users');
          
          const existingUser = await userCollection.findOne({
            username: data.username,
            password: data.password
          });

          console.log(existingUser)
          if(existingUser){
              await userCollection.updateOne(
                  {_id: existingUser._id},
                  {$set: {password: data.newPassword}}
              )
              res.send(existingUser._id)
          } else {
              res.send({error: "no user found with those credentials"})
          }
      })
  }
};

module.exports = usersController;
