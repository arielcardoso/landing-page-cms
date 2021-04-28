const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../controllers/Auth');

// Controllers
const preferencesController = require('../controllers/preferences.controller');
const sectionController = require('../controllers/section.controller');
const productController = require('../controllers/product.controller');
const serviceController = require('../controllers/service.controller');
const faqController = require('../controllers/faq.controller');
const headerController = require('../controllers/header.controller');
const slideController = require('../controllers/slide.controller');
const bannerController = require('../controllers/banner.controller');
const messageController = require('../controllers/message.controller');

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
router.get('/informations', ensureAuthenticated, preferencesController.siteInfo);
router.post('/informations', ensureAuthenticated, preferencesController.updateSiteInfo);

router.get('/customization', ensureAuthenticated, preferencesController.customization);
router.post('/customization', ensureAuthenticated, preferencesController.updateCustomization);

router.get('/maintenence', ensureAuthenticated, (req, res) =>
    res.render('admin/maintenence', {user: req.user})
);

// Header
router.get('/header', ensureAuthenticated, headerController.header);
router.post('/header', ensureAuthenticated, headerController.updateHeader);
router.post('/slide/add', ensureAuthenticated, slideController.addSlide);
router.get('/slide/delete/:id', ensureAuthenticated, slideController.deleteSlide);

// Sections
router.get('/section-banners', ensureAuthenticated, sectionController.banners);
router.post('/section-banners', ensureAuthenticated, sectionController.updateBanners);
router.post('/section-banners/add', ensureAuthenticated, bannerController.addBanner);
router.get('/section-banners/delete/:id', ensureAuthenticated, bannerController.deleteBanner);

router.get('/section-about', ensureAuthenticated, sectionController.about);
router.post('/section-about', ensureAuthenticated, sectionController.updateAbout);

router.get('/section-products', ensureAuthenticated, sectionController.products);
router.post('/section-products', ensureAuthenticated, sectionController.updateProducts);
router.post('/section-products/add', ensureAuthenticated, productController.addProduct);
router.get('/section-products/delete/:id', ensureAuthenticated, productController.deleteProduct);

router.get('/section-services', ensureAuthenticated, sectionController.services);
router.post('/section-services', ensureAuthenticated, sectionController.updateServices);
router.post('/section-services/add', ensureAuthenticated, serviceController.addService);
router.get('/section-services/delete/:id', ensureAuthenticated, serviceController.deleteService);

router.get('/section-faq', ensureAuthenticated, sectionController.faq);
router.post('/section-faq', ensureAuthenticated, sectionController.updateFaq);
router.post('/section-faq/add', ensureAuthenticated, faqController.addFaq);
router.get('/section-faq/delete/:id', ensureAuthenticated, faqController.deleteFaq);

router.get('/section-contact', ensureAuthenticated, sectionController.contact);
router.post('/section-contact', ensureAuthenticated, sectionController.updateContact);

// Messages
router.get('/messages', ensureAuthenticated, messageController.listMessages);
router.get('/messages/:id', ensureAuthenticated, messageController.readMessage);
router.get('/messages/delete/:id', ensureAuthenticated, messageController.deleteMessage);

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/admin/login');
});

module.exports = router;