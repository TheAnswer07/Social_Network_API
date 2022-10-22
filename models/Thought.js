const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    thoughts: {
        type: Array,
        default: [],
    },
    description: {
        type: String,
        max: 500,
    },
    img: {
        type: String,
    },
    reactions: {
        type: Array,
        default: [],
    },
},

{ timestamps: true }

);

module.exports = mongoose.model("Thought", ThoughtSchema);