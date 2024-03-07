const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const bodyParser = require('body-parser');
var cors = require('cors');
router.use(cors());
router.use(bodyParser.json());

// Get all suppliers
router.get('/all', async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single supplier by ID
router.get('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new supplier
router.post('/', async (req, res) => {
    try {
        const { supplierName, contact, city } = req.body;
        const newSupplier = new Supplier({ supplierName, contact, city });
        await newSupplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        console.error('Error creating supplier:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a supplier by ID
router.delete('/:id', async (req, res) => {
    try {
        const supplierId = req.params.id;

        // Check if the supplier exists
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        // Delete the supplier from the database
        await Supplier.findByIdAndDelete(supplierId);

        res.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a supplier by ID
router.put('/:id', async (req, res) => {
    try {
        const supplierId = req.params.id;
        const { supplierName, contact, city } = req.body;

        // Check if the supplier exists
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        // Update the supplier fields
        supplier.supplierName = supplierName;
        supplier.contact = contact;
        supplier.city = city;

        // Save the updated supplier to the database
        await supplier.save();

        res.json(supplier);
    } catch (error) {
        console.error('Error updating supplier:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
