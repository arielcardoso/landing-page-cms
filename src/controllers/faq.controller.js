const Faq = require('../models/faq.model')

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}

exports.addFaq = wrapAsync(async(req, res) => {
    let error = '';

    const newItem = new Faq({
        question: req.body.question,
        answer: req.body.answer,
        order: req.body.order
    });
    newItem.save()
    .then()
    .catch(err => {
        error = 'Error on create a faq item!';
        console.log(err);
    });

    if (error === '') {
        req.flash('success_msg', 'New faq item created!');
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