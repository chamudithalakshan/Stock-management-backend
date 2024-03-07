const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/all', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new category
router.post('/', async (req, res) => {
    try {
        const { categoryId, categoryName } = req.body;
        const newCategory = new Category({ categoryId, categoryName });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Check if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Delete the category from the database
        await Category.findByIdAndDelete(categoryId);

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
    try {
        const categoryIdParam = req.params.id; // Renamed to categoryIdParam
        const { categoryId, categoryName } = req.body;

        // Check if the category exists
        const category = await Category.findById(categoryIdParam); // Using categoryIdParam
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Update the category fields
        category.categoryId = categoryId;
        category.categoryName = categoryName;

        // Save the updated category to the database
        await category.save();

        res.json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
