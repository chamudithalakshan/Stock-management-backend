const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: { type: String, required: true },
    supplierId: { type: String, required: true },
    Quantity: { type: String, required: true },
    barcode: { type: String } // New field to store barcode data
    // Add more fields as per your product requirements
});

module.exports = mongoose.model('Products', productSchema);