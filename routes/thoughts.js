const router = require("express").Router();
const Thought = require("../models/Thought")

//Creating a thought

router.post("/", async (req, res) => {
    const newThought = new Thought(req.body)
    try {
        const savedThought = await newThought.save();
        res.status(200).json(savedThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Updating a thought

router.put("/:id", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (thought.userId === req.body.userId) {
            await thought.updateOne({ $set: req.body });
            res.status(200).json("Thought successfully updated!")
        } else {
            res.status(403).json("You can only update your own Thought!")
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//Deleting a thought

router.delete("/:id", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (thought.userId === req.body.userId) {
            await thought.deleteOne();
            res.status(200).json("Thought successfully deleted!")
        } else {
            res.status(403).json("You can only delete your own Thought!")
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//Liking/Disliking a thought

router.put("/:id/like", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought.likes.includes(req.body.userId)) {
            await thought.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Thought successfully liked!")
        } else {
            await thought.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("Thought successfully disliked!")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Getting a thought

router.get("/:id", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Getting all thoughts from own account

router.get("/thoughts/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userThoughts = await Thought.find({ userId: currentUser._id });
        const friendThoughts = await Promise.all(
            currentUser.followings.map((friendId) => {
            return Thought.find({ userId: friendId });
        })
        );
        res.json(userThoughts.concat(...friendThoughts));
    } catch (err) {
    res.status(500).json(err);
}
});


module.exports = router;