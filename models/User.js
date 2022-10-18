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
    thoughts: {
        type: Array,
        default: [],
    },
    friends: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        max: 75,
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        enom: [1,2,3],
    },
},

{ timestamps: true }

);

module.exports = mongoose.model("User", UserSchema);