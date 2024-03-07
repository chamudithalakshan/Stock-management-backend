const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');

// Get all branches
router.get('/all', async (req, res) => {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single branch by ID
router.get('/:id', async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }
        res.json(branch);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new branch
router.post('/', async (req, res) => {
    try {
        const { branchName, branchLocation } = req.body;
        const newBranch = new Branch({ branchName, branchLocation });
        await newBranch.save();
        res.status(201).json(newBranch);
    } catch (error) {
        console.error('Error creating branch:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a branch by ID
router.delete('/:id', async (req, res) => {
    try {
        const branchId = req.params.id;

        // Check if the branch exists
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }

        // Delete the branch from the database
        await Branch.findByIdAndDelete(branchId);

        res.json({ message: 'Branch deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a branch by ID
router.put('/:id', async (req, res) => {
    try {
        const branchId = req.params.id;
        const { branchName, branchLocation } = req.body;

        // Check if the branch exists
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }

        // Update the branch fields
        branch.branchName = branchName;
        branch.branchLocation = branchLocation;

        // Save the updated branch to the database
        await branch.save();

        res.json(branch);
    } catch (error) {
        console.error('Error updating branch:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
