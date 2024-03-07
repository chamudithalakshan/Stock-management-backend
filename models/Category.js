const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true }
    // Add more fields as per your product requirements
});

module.exports = mongoose.model('Category', categorySchema);