const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const flash = require('express-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const app = express()

//setup the views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static("./public"));

//setup passport
const passport = require('passport')
require('./src/controllers/Passport')(passport);

//setup express
app.use(
  session({
    secret: keys.secretKey,
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/admin', require('./src/routes/admin.route'));
app.use('/', require('./src/routes/public.route'));

//connect to db and express
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to Database!");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  })
  .catch((err) => {
    console.log(err);
  });