const mongoose = require('mongoose');

const issueProductDetailSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const issueProductSchema = new mongoose.Schema({
    branchCode: { type: String, required: true },
    date: { type: Date, required: true },
    issueProductDetails: [issueProductDetailSchema]
});

module.exports = mongoose.model('IssueOrder', issueProductSchema);
