const router = require("express").Router;
const Post = require("../models/Post")

//Creating a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Updating a post

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("Post successfully updated!")
        } else {
            res.status(403).json("You can only update your own post!")
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//Deleting a post

//Liking a post

//Getting a post

//Getting all posts from own account's timeline




module.exports = router;