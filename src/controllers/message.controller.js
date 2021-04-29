const Message = require('../models/message.model')

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}

exports.listMessages = wrapAsync(async(req, res) => {
    const messages = await Message.find({}).sort({'date': 'desc'});
    await Message.updateMany({new: true}, {new: false});
    res.render('admin/messages', {user: req.user, messages: messages});
});

exports.readMessage = wrapAsync(async(req, res) => {
    const { id } = req.params;
    const message = await Message.findOneAndUpdate({_id: id}, {new: false});
    res.render('admin/message', {user: req.user, message: message});
});

exports.deleteMessage = wrapAsync(async(req, res) => {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.redirect('/admin/messages');
});