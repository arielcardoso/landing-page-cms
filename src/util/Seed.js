/* ============================================
Stand alone file to be executed to populate 
the database with the given const data
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
const Product = require('../models/product.model');
const Service = require('../models/service.model');
const Banner = require('../models/banner_model');
const Slide = require('../models/slide.model');
const Faq = require('../models/faq.model');

//============== Delete Many =============
User.deleteMany().catch(err => { console.log(err)})
Option.deleteMany().catch(err => { console.log(err)})
Section.deleteMany().catch(err => { console.log(err)})
Product.deleteMany().catch(err => { console.log(err)})
Service.deleteMany().catch(err => { console.log(err)})
Banner.deleteMany().catch(err => { console.log(err)})
Slide.deleteMany().catch(err => { console.log(err)})
Faq.deleteMany().catch(err => { console.log(err)})

//============== Delete files =============
const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname, '..', '..','public', 'files');

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    if (file.substr(0,11) != "placeholder") {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  }
});

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
  { name: "site_maintenance", value: "1"},
  { name: "site_title", value: "Site Title"},
  { name: "site_description", value: "Site Description"},
  { name: "logo", value: "placeholder_logo.png" },
  { name: "favicon", value: "placeholder_favicon.png"},
  { name: "primary_color", value: "#000000"},
  { name: "secondary_color", value: "#90a4b6"},
  { name: "header_layout", value: "wided"},
  { name: "header_title_color", value: "#ffffff"},
  { name: "header_description_color", value: "#dddddd"},
  { name: "social_instagram", value: "https://instagram.com"},
  { name: "social_facebook", value: "https://facebook.com"},
  { name: "social_twitter", value: "https://twitter.com"},
  { name: "social_linkedin", value: "https://linkedin.com"},
  { name: "phone", value: "123 456 7890"},
  { name: "email", value: "email@domain.com"},
  { name: "address", value: ""},
  { name: "business_hours", value: "Mon ~ Fri / 9am to 6pm "},
]).then(res => {
    console.log('Options created!');
}).catch(err => {
    console.log(err);
})

//============== Create Sections =============
Section.insertMany([
  { name: "BANNERS",  title: "Banners",   description: "Company Features", order: 1, enable: true, grid_items: 3},
  { name: "ABOUT",    title: "About",     description: "Know more about the company", order: 2, enable: true},
  { name: "PRODUCTS", title: "Products",  description: "Check our finnest products", order: 3, enable: true, grid_items: 4},
  { name: "SERVICES", title: "Services",  description: "What we can do for your business", order: 4, enable: true, grid_items: 4},
  { name: "FAQ",      title: "FAQ",       description: "Frequently Asked Questions", order: 5, enable: true},
  { name: "CONTACT",  title: "Contact",   description: "Stay in touch with us", order: 6, enable: true},
]).then(res => {
    console.log('Sections created!');
}).catch(err => {
    console.log(err);
})

//============== Products =============
Product.insertMany([
  { image: "placeholder_product.jpg", name: "Product Name", description: "Lorem ipsum dolor", order: 1 },
  { image: "placeholder_product.jpg", name: "Product Name", description: "Sit amet consectetur", order: 2 },
  { image: "placeholder_product.jpg", name: "Product Name", description: "Dolem adipisicing elit", order: 3 }
]).then(res => {
  console.log('Products created!');
}).catch(err => {
  console.log(err);
})

//============== Services =============
Service.insertMany([
  { image: "placeholder_service.jpg", name: "Service Name", description: "Lorem ipsum dolor", order: 1 },
  { image: "placeholder_service.jpg", name: "Service Name", description: "Sit amet consectetur", order: 2 },
  { image: "placeholder_service.jpg", name: "Service Name", description: "Dolem adipisicing elit", order: 3 }
]).then(res => {
  console.log('Services created!');
}).catch(err => {
  console.log(err);
})

//============== Banners =============
Banner.insertMany([
  { icon: "check-circle-fill", title: "Featured Item", description: "Lorem ipsum dolor", order: 1 },
  { icon: "building", title: "Featured Item", description: "Sit amet consectetur", order: 2 },
  { icon: "calendar-check", title: "Featured Item", description: "Dolem adipisicing elit", order: 3 },
  { icon: "headset", title: "Featured Item", description: "Dolem adipisicing elit", order: 3 }
]).then(res => {
  console.log('Banners created!');
}).catch(err => {
  console.log(err);
})

//============== Slides =============
Slide.insertMany([
  { image: "placeholder_slide.jpg", title: "Slide Example 1", description: "Lorem ipsum dolor", order: 1 },
  { image: "placeholder_slide.jpg", title: "Slide Example 2", description: "Sit amet consectetur", order: 2 },
]).then(res => {
  console.log('Slides created!');
}).catch(err => {
  console.log(err);
})

//============== FAQ Questions =============
Faq.insertMany([
  { question: "Example Question #1", answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", order: 1 },
  { question: "Example Question #2", answer: "Modi at ut dolorum incidunt voluptatem nemo perspiciatis id maiores sint.", order: 2 },
  { question: "Example Question #3", answer: "Dolem at incidunt perspiciatis voluptatem nemo id maiores.", order: 2 },
]).then(res => {
    console.log('Faq questions created!');
}).catch(err => {
    console.log(err);
})
