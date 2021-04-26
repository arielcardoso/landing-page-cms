const Options = require('../models/option.model')

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

exports.siteInfo = wrapAsync(async(req, res) => {
    const preferences = await Options.find({});
    let data = [];
    preferences.map((pref) => {
        data[pref.name] = pref.value;
    });
    res.render('admin/informations', {user: req.user, data: data});
});

exports.updateSiteInfo = wrapAsync(async(req, res) => {
    let error = '';

    const data = {
        site_title: req.body.site_title,
        site_description: req.body.site_description,
        social_facebook: req.body.social_facebook, 
        social_instagram: req.body.social_instagram, 
        social_twitter: req.body.social_twitter, 
        social_linkedin: req.body.social_linkedin
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

    res.redirect('/admin/informations');
});

exports.customization = wrapAsync(async(req, res) => {
    const preferences = await Options.find({});
    let data = [];

    preferences.map((pref) => {
        data[pref.name] = pref.value;
    });
    res.render('admin/customization', {user: req.user, data: data});
});

exports.updateCustomization = wrapAsync(async(req, res) => {
    const formidable = require('formidable');
    const form = new formidable.IncomingForm();
    const path = require('path');
    const fs = require('fs');
    let error = '';

    let oldLogo = '';
    await Options.findOne({name: 'logo'}, function(err,obj) { console.log('OldLogo', obj); oldLogo = obj.value });

    let oldFavicon = '';
    await Options.findOne({name: 'favicon'}, function(err,obj) { console.log('OldFavicon', obj); oldFavicon = obj.value });

    form.parse(req, (err, fields, files) => {
        //console.log('Fields', fields);
        //console.log(files);

        const data = {
            primary_color: fields.primary_color, 
            secondary_color: fields.secondary_color, 
            layout: fields.layout
        };
        for (const [key, value] of Object.entries(data)) {
            Options.findOneAndUpdate(
                {name: key}, 
                {$set:{value: value}}, 
                {new: true}, 
                (err, doc) => {
                    if (err) {
                        error = 'Error trying to update! ' + err;
                        console.log('Error trying to update!', err);
                    }
                }
            );
        }

        if (files.logo && files.logo.path && files.logo.name) {
            let filename = 'logo_' + Date.now() + MIME_TYPE_MAP[files.logo.type];
            let tempPath = files.logo.path;
            let newPath = path.join(__dirname, '..', '..','public', 'files', filename);

            fs.rename(tempPath, newPath, function (err) {
                if (err){
                    error = 'Error on upload file! ' + err;
                    console.log('Error on upload file!', err);
                } else {
                    Options.findOneAndUpdate(
                        {name: 'logo'}, 
                        {$set:{value: filename}}, 
                        {new: true}, 
                        (err, doc) => {
                            if (err) {
                                error = 'Error trying to update! ' + err;
                                console.log('Error trying to update!', err);
                            }
                            if (oldLogo.substr(0,11) != "placeholder") {
                                let oldFile = path.join(__dirname, '..', '..','public', 'files', oldLogo);
                                fs.unlink(oldFile, err => console.log(err));
                            }
                        }
                    );
                }
            });
        }

        if (files.favicon && files.favicon.path && files.favicon.name) {
            let filename = 'favicon_' + Date.now() + MIME_TYPE_MAP[files.favicon.type];
            let tempPath = files.favicon.path;
            let newPath = path.join(__dirname, '..', '..', 'public', 'files', filename);
    
            fs.rename(tempPath, newPath, function (err) {
                if (err) {
                    error = 'Error on upload file! ' + err;
                    console.log('Error on upload file!', err);
                } else {
                    Options.findOneAndUpdate(
                        {name: 'favicon'}, 
                        {$set:{value: filename}}, 
                        {new: true}, 
                        (err, doc) => {
                            if (err) {
                                error = 'Error trying to update! ' + err;
                                console.log('Error trying to update!', err);
                            }
                            if (oldFavicon.substr(0,11) != "placeholder") {
                                let oldFile = path.join(__dirname, '..', '..','public', 'files', oldFavicon);
                                fs.unlink(oldFile, err => console.log(err));
                            }
                        }
                    );
                }
            });
        }
    });

    if (error === '') {
        req.flash('success_msg', 'Options updated!');
    } else {
        req.flash('error_msg', error);
    }
    
    res.redirect('/admin/customization');
});
