const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/Users');
const bodyParser = require('body-parser');
var cors = require('cors');
router.use(cors());
router.use(bodyParser.json());

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // If the user does not exist, return an error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If the passwords match, send a success response
        if (passwordMatch) {
            res.json({ message: 'Login successful' });
        } else {
            // If the passwords do not match, send an error response
            res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, address, contact, role } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = new User({ name, email, password: hashedPassword, address, contact, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all users
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user from the database
        await User.findByIdAndDelete(userId);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password, address, contact, role } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user fields
        user.name = name;
        user.email = email;
        user.password = password; // Note: You may want to hash the password here as well if it's being updated
        user.address = address;
        user.contact = contact;
        user.role = role;

        // Save the updated user to the database
        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
