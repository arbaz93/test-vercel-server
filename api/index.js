const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors())
app.use(express.json())
// const mongoose = require("mongoose");
// const UserModel = require("./models/Users");
const URI = 'mongodb+srv://stevecarter1123:d29Zrrqap6pWwPq8@cluster0.f6gpx.mongodb.net/sample_mflix'
// mongoose.connect(URI)
app.get("/", (req, res) => res.send("Server Running..."));


export default app