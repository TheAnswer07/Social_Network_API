const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    res.send("Hi! I'm a user!");
})


//Updating user

router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account successfully updated!")
        } catch {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only update your own personal account!");
    }
});


//Deleting user

router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        
        try{
            const user = await User.deleteOne(req.params.id);
            res.status(200).json("Account successfully deleted!")
        } catch {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only delete your own personal account!");
    }
});


//Get a user


//Follow a user


//Unfollw a user

module.exports = router;