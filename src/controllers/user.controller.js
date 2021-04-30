const User = require('../models/user.model')

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}

exports.profile = wrapAsync(async(req, res) => {
    const data = await User.findOne({username: req.user.username});
    res.render('admin/profile', {user: req.user, data: data});
});

exports.updateSiteInfo = wrapAsync(async(req, res) => {
    const bcrypt = require('bcryptjs')
    let error = '';

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;

            User.updateOne(
                {username: req.user.username}, {password: hash}
            ).catch(err => {
                error = 'Error on update profile!';
                console.log('Error on update profile!', err);
            });
        });
    });

    if (error === '') {
        req.flash('success_msg', 'Profile Updated!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/admin/profile');
});