const mlab = require("../keys").mlab;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbName = "score-study-comments";
const url = `mongodb://${mlab.username}:${mlab.password}@ds149700.mlab.com:49700/score-study-comments`;
const connectionSettings = { useNewUrlParser: true, useUnifiedTopology: true };

const commentsController = {

    // CREATE
    createComment: (req, res) => {

        const {body} = req;

        MongoClient.connect(url, connectionSettings, async (err, client) => {
            const comments = client.db(dbName).collection("comments")
            const inserted = await comments.insertOne({
                userID: new ObjectID(body.userID),
                workID: new ObjectID(body.workID),
                content: body.content
            })

            res.send(inserted);
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

export default commentsController;