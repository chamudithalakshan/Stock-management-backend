const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../models/PurchaseOrder');
var cors = require('cors');
const bodyParser = require('body-parser');
router.use(cors());
router.use(bodyParser.json());

// Create multiple purchase orders
router.post('/bulk', async (req, res) => {
    try {
        const purchaseOrdersData = req.body; // Array of purchase order objects

        // Validate the request body
        if (!Array.isArray(purchaseOrdersData)) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const createdPurchaseOrders = [];

        // Iterate through each purchase order data and create new purchase orders
        for (const orderData of purchaseOrdersData) {
            const { date, supplierId, purchaseOrderDetails } = orderData;

            // Create a new purchase order instance
            const newPurchaseOrder = new PurchaseOrder({ date, supplierId, purchaseOrderDetails });

            // Save the new purchase order to the database
            await newPurchaseOrder.save();

            // Push the created purchase order to the array
            createdPurchaseOrders.push(newPurchaseOrder);
        }

        res.status(201).json(createdPurchaseOrders);
    } catch (error) {
        console.error('Error creating purchase orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all purchase orders
router.get('/', async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.find();
        res.json(purchaseOrders);
    } catch (error) {
        console.error('Error fetching purchase orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
