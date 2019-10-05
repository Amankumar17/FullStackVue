const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get posts
router.get('/',async (req,res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//Add post
router.post('/',async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text:req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
});

//Delete Posts
router.delete('/:id', async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id:new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://aman:4418@amankumar-nszqs.mongodb.net/admin?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Amankumar').collection('posts')

};

module.exports = router;