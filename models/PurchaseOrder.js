const mongoose = require('mongoose');

const purchaseOrderDetailSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
});

const purchaseOrderSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    supplierId: { type: Number, required: true },
    purchaseOrderDetails: [purchaseOrderDetailSchema]
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
