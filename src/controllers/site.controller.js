const Option = require('../models/option.model');
const Section = require('../models/section.model');
const Product = require('../models/product.model');
const Service = require('../models/service.model');
const Banner = require('../models/banner_model');
const Slide = require('../models/slide.model');
const Faq = require('../models/faq.model');
const Message = require('../models/message.model')

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}

exports.index = wrapAsync(async(req, res) => {
    const sections = await Section.find({enable: true}).sort([['order', 1]]);
    const services = await Service.find({}).sort([['order', 1]]);
    const products = await Product.find({}).sort([['order', 1]]);
    const banners = await Banner.find({}).sort([['order', 1]]);
    const slides = await Slide.find({}).sort([['order', 1]]);
    const faqs = await Faq.find({}).sort([['order', 1]]);

    const origOptions = await Option.find({});
    let options = [];
    origOptions.map((item) => {
        options[item.name] = item.value;
    });

    if (options.site_maintenance != '') {
        res.render('site/maintenance');
    } else {
        res.render('site/index', {
            sections: sections,
            options: options,
            services: services,
            products: products,
            banners: banners,
            slides: slides,
            faqs: faqs
        });
    }
});

exports.sendMessage = wrapAsync(async(req, res) => {
    let error = '';

    const newMessage = new Message({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message
    });
    newMessage.save()
    .catch(err => {
        error = 'Error on create a new message!';
        console.log(err);
    });

    if (error === '') {
        req.flash('success_msg', 'Your message has been sent successfully! Thank you!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/#CONTACT');
}); 