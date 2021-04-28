const Options = require('../models/option.model')
const Slide = require('../models/slide.model')

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}

exports.header = wrapAsync(async(req, res) => {
    const options = await Options.find({});
    let data = [];
    options.map((pref) => {
        data[pref.name] = pref.value;
    });
    
    data.slides = await Slide.find({});
    res.render('admin/header', {user: req.user, data: data});
});

exports.updateHeader = wrapAsync(async(req, res) => {
    let error = '';

    const data = {
        header_title_color: req.body.header_title_color,
        header_description_color: req.body.header_description_color,
        header_layout: req.body.header_layout
    };
    
    for (const [key, value] of Object.entries(data)) {
        await Options.findOneAndUpdate(
            {name: key}, 
            {$set:{value: value}}, 
            {new: true}, 
            (err, doc) => {
                if (err) {
                    error = 'Error on update!';
                    console.log('Error on update!', err);
                }
            }
        );
    }

    if (error === '') {
        req.flash('success_msg', 'Options updated!');
    } else {
        req.flash('error_msg', error);
    }

    if (error === '') {
        req.flash('success_msg', 'Section updated!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/admin/header');
});
