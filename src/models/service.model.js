const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const ServiceSchema = new mongoose.Schema({
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

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;