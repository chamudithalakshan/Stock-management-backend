const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/stock-management';

mongoose.connect(MONGO_URI, {
    // bufferCommands: false, // Disable command buffering
    // bufferTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });