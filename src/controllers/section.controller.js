const Sections = require('../models/section.model')
const Faq = require('../models/faq.model')

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}
const NUM_SECTIONS = 7;

exports.about = wrapAsync(async(req, res) => {
    const data = await Sections.findOne({name: 'ABOUT'});
    data.num_sections = NUM_SECTIONS;
    res.render('admin/section-about', {user: req.user, data: data});
});

exports.updateAbout = wrapAsync(async(req, res) => {
    let error = '';
    
    await Sections.findOneAndUpdate(
        {name: 'ABOUT'}, 
        {
            title: req.body.title, 
            description: req.body.description,
            order: req.body.order,
            enable: (req.body.enable == 'true') ? true : false
        },
        (err, doc) => {
            if (err) {
                error = 'Error on update!';
                console.log('Error on update!', err);
            }
        }
    );

    if (error === '') {
        req.flash('success_msg', 'Options updated!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/admin/section-about');
});

exports.products = wrapAsync(async(req, res) => {
    const data = await Sections.findOne({name: 'PRODUCTS'});
    data.num_sections = NUM_SECTIONS;
    res.render('admin/section-products', {user: req.user, data: data});
});

exports.updateProducts = wrapAsync(async(req, res) => {
    let error = '';
    
    await Sections.findOneAndUpdate(
        {name: 'PRODUCTS'}, 
        {
            title: req.body.title, 
            description: req.body.description,
            order: req.body.order,
            enable: (req.body.enable == 'true') ? true : false
        },
        (err, doc) => {
            if (err) {
                error = 'Error on update!';
                console.log('Error on update!', err);
            }
        }
    );

    if (error === '') {
        req.flash('success_msg', 'Options updated!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/admin/section-products');
});


exports.services = wrapAsync(async(req, res) => {
    const data = await Sections.findOne({name: 'SERVICES'});
    data.num_sections = NUM_SECTIONS;
    res.render('admin/section-services', {user: req.user, data: data});
});

exports.updateServices = wrapAsync(async(req, res) => {
    let error = '';

    await Sections.findOneAndUpdate(
        {name: 'SERVICES'}, 
        {
            title: req.body.title, 
            description: req.body.description,
            order: req.body.order,
            enable: (req.body.enable == 'true') ? true : false
        },
        (err, doc) => {
            if (err) {
                error = 'Error on update!';
                console.log('Error on update!', err);
            }
        }
    );

    if (error === '') {
        req.flash('success_msg', 'Options updated!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/admin/section-services');
});

exports.faq = wrapAsync(async(req, res) => {
    const data = await Sections.findOne({name: 'FAQ'});
    data.num_sections = NUM_SECTIONS;
    data.questions = await Faq.find({});
    res.render('admin/section-faq', {user: req.user, data: data});
});

exports.updateFaq = wrapAsync(async(req, res) => {
    let error = '';

    await Sections.findOneAndUpdate(
        {name: 'FAQ'}, 
        {
            title: req.body.title, 
            description: req.body.description,
            order: req.body.order,
            enable: (req.body.enable == 'true') ? true : false
        },
        (err, doc) => {
            if (err) {
                error = 'Error on update!';
                console.log('Error on update!', err);
            }
        }
    );

    if (error === '') {
        req.flash('success_msg', 'Options updated!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/admin/section-faq');
});

exports.addFaq = wrapAsync(async(req, res) => {
    let error = '';

    const newQuestion = new Faq({
        question: req.body.question,
        answer: req.body.answer,
        order: req.body.order
    });
    newQuestion.save()
    .then()
    .catch(err => {
        error = 'Error on create a question!';
        console.log(err);
    });

    if (error === '') {
        req.flash('success_msg', 'Question created!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/admin/section-faq');
});

exports.deleteFaq = wrapAsync(async(req, res) => {
    const { id } = req.params;
    await Faq.findByIdAndDelete(id);
    res.redirect('/admin/section-faq');
});

exports.contact = wrapAsync(async(req, res) => {
    const data = await Sections.findOne({name: 'CONTACT'});
    console.log(data);
    data.num_sections = NUM_SECTIONS;
    res.render('admin/section-contact', {user: req.user, data: data});
});

exports.updateContact = wrapAsync(async(req, res) => {
    let error = '';

    console.log('Data', req.body);

    await Sections.findOneAndUpdate(
        {name: 'CONTACT'}, 
        {
            title: req.body.title, 
            description: req.body.description,
            order: req.body.order,
            enable: (req.body.enable == 'true') ? true : false,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            hours: req.body.hours,
        },
        (err, doc) => {
            if (err) {
                error = 'Error on update!';
                console.log('Error on update!', err);
            }
        }
    );

    if (error === '') {
        req.flash('success_msg', 'Options updated!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/admin/section-contact');
});