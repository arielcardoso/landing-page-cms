const Banner = require('../models/banner_model')

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}

exports.addBanner = wrapAsync(async(req, res) => {
    let error = '';

    const newItem = new Banner({
        icon: req.body.icon,
        title: req.body.title,
        description: req.body.description,
        order: req.body.order
    });

    newItem.save()
    .then()
    .catch(err => {
        error = 'Error on create a banner!';
        console.log(err);
    });

    if (error === '') {
        req.flash('success_msg', 'New banner created!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/admin/section-banners');
});

exports.deleteBanner = wrapAsync(async(req, res) => {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    res.redirect('/admin/section-banners');
});