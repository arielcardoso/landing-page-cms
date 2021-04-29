const Section = require('../models/section.model')
const Option = require('../models/option.model')
const Product = require('../models/product.model')
const Service = require('../models/service.model')
const Message = require('../models/message.model')
const Faq = require('../models/faq.model')

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}

exports.dashboard = wrapAsync(async(req, res) => {
    const data = []
    data.count_sections = await Section.countDocuments({enable: true});
    data.count_products = await Product.countDocuments({});
    data.count_services = await Service.countDocuments({});
    data.count_messages = await Message.countDocuments({});
    data.count_faq_questions = await Faq.countDocuments({});

    await Option.findOne({name: 'site_maintenance'}, function (err, option) {
        data.site_maintenance = option.value;
    });
    
    res.render('admin/dashboard', {user: req.user, data: data});
});
