const express = require('express');
const router = express.Router();
const IssueOrder = require('../models/IssueProduct');

// Create multiple issue orders
router.post('/bulk', async (req, res) => {
    try {
        const issueOrdersData = req.body; // Array of issue order objects

        // Validate the request body
        if (!Array.isArray(issueOrdersData)) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const createdIssueOrders = [];

        // Iterate through each issue order data and create new issue orders
        for (const orderData of issueOrdersData) {
            const { branchCode, date, issueProductDetails } = orderData;

            // Create a new issue order instance
            const newIssueOrder = new IssueOrder({ branchCode, date, issueProductDetails });

            // Save the new issue order to the database
            await newIssueOrder.save();

            // Push the created issue order to the array
            createdIssueOrders.push(newIssueOrder);
        }

        res.status(201).json(createdIssueOrders);
    } catch (error) {
        console.error('Error creating issue orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const issueOrders = await IssueOrder.find();
        res.json(issueOrders);
    } catch (error) {
        console.error('Error fetching issue orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
