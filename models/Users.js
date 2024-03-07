const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    role: { type: String, required: true }
    // Add more fields as per your product requirements
});

module.exports = mongoose.model('Users', userSchema);