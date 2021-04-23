const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const SectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    order: {
        type: Number
    }
});

const Section = mongoose.model('Section', SectionSchema);
module.exports = Section;