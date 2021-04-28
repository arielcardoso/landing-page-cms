const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const BannerSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    icon: {
        type: String
    },
    image: {
        type: String
    },
    order: {
        type: Number,
        required: true
    }
});

const Banner = mongoose.model('Banner', BannerSchema);
module.exports = Banner;