const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const SlideSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
});

const Slide = mongoose.model('Slide', SlideSchema);
module.exports = Slide;