const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const FaqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    order: {
        type: Number
    }
});

const Faq = mongoose.model('Faq', FaqSchema);
module.exports = Faq;