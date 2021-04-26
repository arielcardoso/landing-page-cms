const path = require('path');
const fs = require('fs');

const Product = require('../models/product.model')

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}

const MIME_TYPE_MAP = {
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/gif": "gif"
}

exports.addProduct = wrapAsync(async(req, res) => {
    const formidable = require('formidable');
    const form = new formidable.IncomingForm();

    let error = '';

    form.parse(req, (err, fields, files) => {

        if (files.image && files.image.path && files.image.name) {
            let filename = 'product_' + Date.now() + MIME_TYPE_MAP[files.image.type];
            let tempPath = files.image.path;
            let newPath = path.join(__dirname, '..', '..','public', 'files', filename);

            fs.rename(tempPath, newPath, function (err) {
                if (err){
                    error = 'Error on upload file! ' + err;
                    console.log('Error on upload file!', err);
                } else {
                    const newItem = new Product({
                        image: filename,
                        name: fields.name,
                        description: fields.description,
                        order: fields.order
                    });
                    newItem.save()
                    .catch(err => {
                        error = 'Error on create a product!';
                        console.log(err);
                    });
                }
            })
        } else {
            error = 'Upload file not found! ' + err;
            console.log('Upload file not found!', err);
        }
    });

    if (error === '') {
        req.flash('success_msg', 'New product created!');
    } else {
        req.flash('error_msg', error);
    }

    res.redirect('/admin/section-products');
});

exports.deleteProduct = wrapAsync(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product.image.substr(0,11) != "placeholder") {
        const oldFile = path.join(__dirname, '..', '..','public', 'files', product.image);
        fs.unlink(oldFile, err => console.log(err));
    }

    await Product.findByIdAndDelete(id);
    res.redirect('/admin/section-products');
});