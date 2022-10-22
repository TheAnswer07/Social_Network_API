const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const thoughtRoute = require("./routes/thoughts");
const reactionRoute = require("./routes/reactions");

dotenv.config();


//Middlewares

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/thoughts", thoughtRoute);
app.use("/api/reactions", reactionRoute);

mongoose.connect(process.env.MONGO_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => {
    console.log("Connected to MongoDB");

    app.listen(8800, () => {
        console.log("Backend server running in Port 8800");
    });
});
