/* ============================================
Stand alone file to be executed to populate the 
database with the given const data (insertMany)
============================================ */
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const keys = require('../../config/keys')

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log(err);
  });

const User = require('../models/user.model');
const Option = require('../models/option.model');
const Section = require('../models/section.model');
const Faq = require('../models/faq.model');

//============== Delete Many =============
User.deleteMany().catch(err => { console.log(err)})
Option.deleteMany().catch(err => { console.log(err)})
Section.deleteMany().catch(err => { console.log(err)})

//============== User Admin =============
const newUser = new User({
  username: 'admin',
  password: '123'
});
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(res => {
        console.log('User created!');
      }).catch(err => console.log(err));
  });
});

//============== Create Options =============
Option.insertMany([
  { name: "site_title", value: "Site Title"},
  { name: "site_description", value: "Site Description"},
  { name: "logo", value: "placeholder_logo.png" },
  { name: "favicon", value: "placeholder_favicon.png"},
  { name: "layout", value: "wided"},
  { name: "primary_color", value: "#000000"},
  { name: "secondary_color", value: "#90a4b6"},
  { name: "social_instagram", value: "https://instagram.com"},
  { name: "social_facebook", value: "https://facebook.com"},
  { name: "social_twitter", value: "https://twitter.com"},
  { name: "social_linkedin", value: "https://linkedin.com"},
]).then(res => {
    console.log('Options created!');
}).catch(err => {
    console.log(err);
})

//============== Create Sections =============
Section.insertMany([
  { name: "HEADER",   title: "Header",    description: "", order: 0, enable: true},
  { name: "BANNER",   title: "Banners",   description: "", order: 1, enable: true},
  { name: "ABOUT",    title: "About",     description: "", order: 2, enable: true},
  { name: "PRODUCTS", title: "Products",  description: "", order: 3, enable: true},
  { name: "SERVICES", title: "Services",  description: "", order: 4, enable: true},
  { name: "FAQ",      title: "FAQ",       description: "", order: 5, enable: true},
  { name: "CONTACT",  title: "Contact",   description: "", order: 6, enable: true},
]).then(res => {
    console.log('Sections created!');
}).catch(err => {
    console.log(err);
})

//============== FAQ Questions =============
Faq.insertMany([
  { question: "Example Question #1", answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", order: 1 },
  { question: "Example Question #2", answer: "Modi at ut dolorum incidunt voluptatem nemo perspiciatis id maiores sint.", order: 2 },
]).then(res => {
    console.log('Faq questions created!');
}).catch(err => {
    console.log(err);
})
