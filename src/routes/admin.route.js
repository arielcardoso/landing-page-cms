const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../controllers/Auth');

const preferencesController = require('../controllers/preferences.controller');
const faqController = require('../controllers/faq.controller');

// Load User model
const User = require('../models/user.model');

// Redirect initial Page
router.get('/', forwardAuthenticated, (req, res) => res.render('admin/login'));

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('admin/login'));

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('admin/register'));

// // Register
// router.post('/register', (req, res) => {
//     const { username, password, password2 } = req.body;
//     let errors = [];
//     if (!username || !password || !password2) {
//         errors.push({ msg: 'Please enter all fields' });
//     }
//     if (password != password2) {
//         errors.push({ msg: 'Passwords do not match' });
//     }
//     if (password.length < 3) {
//         errors.push({ msg: 'Password must be at least 3 characters' });
//     }
//     if (errors.length > 0) {
//         res.render('admin/register', {
//             errors,
//             username,
//             password,
//             password2
//         });
//     } else {
//         User.findOne({ username: username }).then(user => {
//             if (user) {
//                 errors.push({ msg: 'Username already exists' });
//                 res.render('admin/register', {
//                     errors,
//                     username,
//                     password,
//                     password2
//                 });
//             } else {
//                 const newUser = new User({
//                     username,
//                     password
//                 });
//                 bcrypt.genSalt(10, (err, salt) => {
//                     bcrypt.hash(newUser.password, salt, (err, hash) => {
//                         if (err) throw err;
//                         newUser.password = hash;
//                         newUser
//                         .save()
//                         .then(user => {
//                             req.flash(
//                             'success_msg',
//                             'You are now registered and can log in'
//                             );
//                             res.redirect('/admin/login');
//                         })
//                         .catch(err => console.log(err));
//                     });
//                 });
//             }
//         });
//     }
// });

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('admin/dashboard', {user: req.user})
);

router.get('/informations', preferencesController.siteInfo);
router.post('/informations', preferencesController.updateSiteInfo);

router.get('/customization', ensureAuthenticated, preferencesController.customization);
router.post('/customization', ensureAuthenticated, preferencesController.updateCustomization);

router.get('/maintenence', ensureAuthenticated, (req, res) =>
    res.render('admin/maintenence', {user: req.user})
);
router.get('/section-header', ensureAuthenticated, (req, res) =>
    res.render('admin/section-header', {user: req.user})
);
router.get('/section-banners', ensureAuthenticated, (req, res) =>
    res.render('admin/section-banners', {user: req.user})
);
router.get('/section-about', ensureAuthenticated, (req, res) =>
    res.render('admin/section-about', {user: req.user})
);
router.get('/section-products', ensureAuthenticated, (req, res) =>
    res.render('admin/section-products', {user: req.user})
);
router.get('/section-services', ensureAuthenticated, (req, res) =>
    res.render('admin/section-services', {user: req.user})
);
router.get('/section-faq', ensureAuthenticated, (req, res) =>
    res.render('admin/section-faq', {user: req.user})
);
router.get('/section-contact', ensureAuthenticated, (req, res) =>
    res.render('admin/contact', {user: req.user})
);
router.get('/messages', ensureAuthenticated, (req, res) =>
    res.render('admin/messages', {user: req.user})
);

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/admin/login');
});

module.exports = router;