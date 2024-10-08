const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
})

const ContactModel = mongoose.model("contacts", ContactSchema);

module.exports = ContactModel