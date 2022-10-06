const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 17,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 30,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);