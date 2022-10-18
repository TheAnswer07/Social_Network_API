const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema({
    reactionId: {
        type: String,
        required: true,
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        type: Array,
        default: [],
    },
},

{ timestamps: true }

);

module.exports = mongoose.model("Reaction", ReactionSchema);