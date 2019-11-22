const mlab = require("../keys").mlab;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbName = "score-study-comments";
const url = `mongodb://${mlab.username}:${mlab.password}@ds149700.mlab.com:49700/score-study-comments`;
const connectionSettings = { useNewUrlParser: true, useUnifiedTopology: true };

const commentsController = {

    // CREATE
    createComment: (req, res) => {

        const data = req.body;

        MongoClient.connect(url, connectionSettings, async (err, client) => {
            const commentCollection = client.db(dbName).collection("comments")
            // console.log(comments)
            const inserted = await commentCollection.insertOne(data)
            res.send(inserted.ops[0]._id);
        })
    },

    // READ
    getScoreComments: (req, res) => {

    },

    
    getUserComments: (req, res) => {
        const {body} = req;

        MongoClient.connect(url.connectionSettings, async (err, client) => {
            const comments = client.db(dbName).collection("comments");

            const userComments = await comments.find({userID: body.userID}).toArray()
            res.send(userComments)
        })
    },
    
    // UPDATE
    editComment: (req, res) => {
        const {body} = req;

        MongoClient.connect(url.connectionSettings, async (err, client) => {
            const comments = client.db(dbName).collection("comments");

            const comment = await comments.findOne({_id: body.commentID});

            if(comment){
                comment.content = body.comment

                comments.updateOne({_id: body.commentID}, {$set: {content: body.content}})
                res.send("success")
            }

        })
    },

    // DELETE
    deleteComment: (req, res) => {

    }

}

module.exports = commentsController;