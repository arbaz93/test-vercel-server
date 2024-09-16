const express = require("express");
const app = express();

const cors = require("cors");
const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}
app.options("", cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json())

const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const ContactModel = require("./models/Contacts")

const URI = 'mongodb+srv://stevecarter1123:d29Zrrqap6pWwPq8@cluster0.f6gpx.mongodb.net/artailors'
mongoose.connect(URI)

app.get("/", (req, res) => res.send("Server Running..."));

// Users Route
app.post("/auth", async (request, result) => {
    const user = request.body;
    const st = await UserModel.findOne({username: user.username, password: user.password});
    if(st != null) {
        result.json({...st, status: "Login successfull"})
    } else {
        result.json({status: "Username or Password is wrong"})
    }
})

// Contacts Route
app.get("/getContacts", (request, res) => {
    ContactModel.find()
        .then(result => { res.json(result) })
        .catch(err => {res.json(err)})
})
app.post("/addContact", async (request, result) => {
    const contact = request.body;
    const newContact = new ContactModel(contact)
    if(await ContactModel.exists({phone: contact.phone})) {
        result.json({...contact, status: "Contact already exist"})
    } else {
        await newContact.save()
        result.json(contact)
    }
})
app.post("/deleteContact", async (request, result) => {
    const id = request.body['_id'];
    
    try {
        await ContactModel.findByIdAndDelete(id)
        result.json("suceess")
    } catch(err) {
        result.json(err)
    }
})

export default app