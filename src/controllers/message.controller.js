const Message = require('../models/message.model')

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}

exports.newMessage = wrapAsync(async(req, res) => {
    let error = '';

    const newItem = new Faq({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message
    });
    newItem.save()
    .then()
    .catch(err => {
        error = 'Error on create a new message!';
        console.log(err);
    });

    if (error === '') {
        req.flash('success_msg', 'Message sent successfully. Thank you!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/');
});

exports.listMessages = wrapAsync(async(req, res) => {
    const messages = await Message.find({});
    res.render('admin/messages', {user: req.user, data: messages});
});

exports.readMessage = wrapAsync(async(req, res) => {
    const { id } = req.params;
    const message = await Message.findOneAndUpdate({_id: id}, {new: false});
    res.render('admin/message', {user: req.user, data: message});
});

exports.deleteMessage = wrapAsync(async(req, res) => {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.redirect('/admin/messages');
});