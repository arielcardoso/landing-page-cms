const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const MediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    file: {
        type: String,
        required: true
    },
    extension: {
        type: String
    },
    order: {
        type: Number
    }
});

const Media = mongoose.model('Media', MediaSchema);
module.exports = Media;