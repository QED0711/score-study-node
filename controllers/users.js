const mlab = require("../keys").mlab;
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${mlab.username}:${mlab.password}@ds233268.mlab.com:33268/score-study-users`;
const dbName = "score-study-users";
const connectionSettings = {useNewUrlParser: true, useUnifiedTopology: true}

const usersController = {
    createUser: (req, res) => {
        const data = req.body
        data.authorization = data.authorization || "standard";
        MongoClient.connect(url, connectionSettings, async (err, client) => {
            const userCollection = client.db(dbName).collection("users")

            const existingUsers = await userCollection.find({username: data.username}).toArray()
            
            if (existingUsers.length){
                res.send({error: "Username already exists"})
            } else {
                await userCollection.insertOne(data)
                res.send(data)
            }
        })
    },

    signInUser: (req, res) => {

    },

    deleteUser: (req, res) => {

    }
}

module.exports = usersController;