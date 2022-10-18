const router = require("express").Router();
const Reaction = require("../models/Reaction");
const Thought = require("../models/Reaction")

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


module.exports = router;