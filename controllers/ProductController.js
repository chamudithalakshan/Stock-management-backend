const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const sendEmailNotification = require('../util/email');
const bwipjs = require('bwip-js');
const bodyParser = require('body-parser');
var cors = require('cors');
router.use(cors());
router.use(bodyParser.json());

// router.use("/server",Server);

// Get all products
// Get all products with barcodes
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();

        // Generate barcodes for each product and check for low stock
        for (const product of products) {
            // Generate barcode using product ID
            const barcode = await generateBarcode(product._id.toString());

            // Add barcode to the product object
            product.barcode = barcode;

            // Check if quantity is lower than 100 and send email notification
            if (product.Quantity < 100) {
                await sendEmailNotification(product);
            }
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/products', async (req, res) => {
    try {
        const { productName, category,supplierId,Quantity } = req.body;
        const newProduct = new Product({ productName, category,supplierId,Quantity });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the product from the database
        await Product.findByIdAndDelete(productId);

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const { productName, category, supplierId, Quantity } = req.body;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the product fields
        product.productName = productName;
        product.category = category;
        product.supplierId = supplierId;
        product.Quantity = Quantity;

        // Save the updated product to the database
        await product.save();

        res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to generate barcode using bwip-js library
async function generateBarcode(data) {
    return new Promise((resolve, reject) => {
        bwipjs.toBuffer({
            bcid: 'code128', // Barcode type
            text: data, // Data to encode
            scale: 3, // Scaling factor
            height: 10, // Bar height, in millimeters
            includetext: true, // Include human-readable text
            textxalign: 'center' // Text alignment
        }, (err, png) => {
            if (err) {
                reject(err);
            } else {
                // Convert the barcode buffer to a base64 string
                const barcodeData = `data:image/png;base64,${png.toString('base64')}`;
                resolve(barcodeData);
            }
        });
    });
}



module.exports = router;