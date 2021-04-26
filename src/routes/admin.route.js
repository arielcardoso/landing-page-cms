const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../controllers/Auth');

const preferencesController = require('../controllers/preferences.controller');
const sectionController = require('../controllers/section.controller');
const faqController = require('../controllers/faq.controller');

// Load User model
const User = require('../models/user.model');

// Redirect initial Page
router.get('/', forwardAuthenticated, (req, res) => res.render('admin/login'));

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('admin/login'));
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

// Preferences
router.get('/informations', preferencesController.siteInfo);
router.post('/informations', preferencesController.updateSiteInfo);

router.get('/customization', ensureAuthenticated, preferencesController.customization);
router.post('/customization', ensureAuthenticated, preferencesController.updateCustomization);

router.get('/maintenence', ensureAuthenticated, (req, res) =>
    res.render('admin/maintenence', {user: req.user})
);

// Sections
router.get('/section-about', ensureAuthenticated, sectionController.about);
router.post('/section-about', ensureAuthenticated, sectionController.updateAbout);

router.get('/section-products', ensureAuthenticated, sectionController.products);
router.post('/section-products', ensureAuthenticated, sectionController.updateProducts);

router.get('/section-services', ensureAuthenticated, sectionController.services);
router.post('/section-services', ensureAuthenticated, sectionController.updateServices);

router.get('/section-faq', ensureAuthenticated, sectionController.faq);
router.post('/section-faq', ensureAuthenticated, sectionController.updateFaq);
router.post('/section-faq/add', ensureAuthenticated, sectionController.addFaq);
router.get('/section-faq/delete/:id', ensureAuthenticated, sectionController.deleteFaq);

router.get('/section-contact', ensureAuthenticated, sectionController.contact);
router.post('/section-contact', ensureAuthenticated, sectionController.updateContact);

router.get('/section-header', ensureAuthenticated, (req, res) =>
    res.render('admin/section-header', {user: req.user})
);
router.get('/section-banners', ensureAuthenticated, (req, res) =>
    res.render('admin/section-banners', {user: req.user})
);

// Messages
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