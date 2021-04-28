const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const MessageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    date: {
        type: Date, 
        default: Date.now
    },
    new: {
        type: Boolean, 
        default: true
    }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;