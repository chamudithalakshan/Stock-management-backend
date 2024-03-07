const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const nodemailer = require('nodemailer');



// Configure nodemailer with your email service provider details
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Change this to your email service provider
    auth: {
        user: 'chamudithawickramarathna@gmail.com', // Change this to your email address
        pass: 'xvss btll cuym xcrs' // Change this to your email password
    }
});

// Function to send email notification
async function sendEmailNotification(product) {
    const mailOptions = {
        from: '"Stock management 👻" <chamudithawickramarathna@gmail.com>', // Change this to your email address
        to: 'chamudithawickramarathna@gmail.com', // Change this to the recipient's email address
        subject: 'Low Stock Alert',
        text: `Product ${product.productName} is low in stock. Current quantity: ${product.Quantity}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
}

module.exports = sendEmailNotification;