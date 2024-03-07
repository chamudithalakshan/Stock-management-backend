const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplierName: { type: String, required: true },
    contact: { type: String, required: true },
    city: { type: String, required: true }

    // Add more fields as per your product requirements
});

module.exports = mongoose.model('Suppliers', supplierSchema);