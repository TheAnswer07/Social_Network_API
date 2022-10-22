const router = require("express").Router();
const Reaction = require("../models/Reaction");

//Creating a reaction

router.post("/", async (req, res) => {
    const newReaction = new Reaction(req.body)
    try {
        const savedReaction = await newReaction.save();
        res.status(200).json(savedReaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Updating a reaction

router.put("/:id", async (req, res) => {
    try {
        const reaction = await Reaction.findById(req.params.id);
        if (thought.reactionId === req.body.reactionId) {
            await reaction.updateOne({ $set: req.body });
            res.status(200).json("Reaction successfully updated!")
        } else {
            res.status(403).json("You can only update your own Reaction!")
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//Deleting a reaction

router.delete("/:id", async (req, res) => {
    try {
        const reaction = await Reaction.findById(req.params.id);
        if (thought.reactionId === req.body.reactionId) {
            await reaction.deleteOne();
            res.status(200).json("Reaction successfully deleted!")
        } else {
            res.status(403).json("You can only delete your own Reaction!")
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//Getting a reaction

router.get("/:id", async (req, res) => {
    try {
        const reaction = await Reaction.findById(req.params.id);
        res.status(200).json(reaction);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Getting all reactions from own account

router.get("/reactions/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userReactions = await Reaction.find({ userId: currentUser._id });
        const friendReactions = await Promise.all(
            currentUser.followings.map((friendId) => {
            return Reaction.find({ userId: friendId });
        })
        );
        res.json(userReactions.concat(...friendReactions));
    } catch (err) {
    res.status(500).json(err);
}
});


module.exports = router;