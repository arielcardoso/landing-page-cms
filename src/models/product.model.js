const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    order: {
        type: Number
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;