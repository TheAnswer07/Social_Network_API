const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hi! I'm a user!");
})

module.exports = router;