const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchName: { type: String, required: true },
    BranchLocation: { type: String, required: true }
    // Add more fields as per your product requirements
});

module.exports = mongoose.model('Branch', branchSchema);