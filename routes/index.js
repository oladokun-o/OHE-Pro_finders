// controllers
const user = require('../controllers/user.js')
const router = require('express').Router();
const encode = require('../middlewares/jwt')
const { auth } = require('../middlewares/auth');
const User = require('../models/user')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser');
router.use(cookieParser());

router
    /* GET home page. */
    .get('/', function(req, res, next) {
    res.render('', { title: 'OHE' });
    })
    .get('/contact', function(req, res, next) {
        res.render('contact', { title: 'Contact Us' });
    })
    .get('/blog', function(req, res, next) {
        res.render('blog', { title: 'Blog' });
    })
    .get('/privacy', function (req, res, next) {
        res.render('privacy-policies', { title: 'Terms and conditions' });
    })
    .get('/jobs', function(req, res, next) {
        res.render('work', { title: 'Browse Jobs' });
    })
    .get('/how-it-works', function(req, res, next) {
        res.render('how-it-works', { title: 'How it works' });
    })
    .get('/signup', function(req, res, next) {
        res.render('signup', { title: 'Sign Up' });
    })
    .get('/forgot-password', function(req, res, next) {
        res.render('forgot-password', { title: 'Forgot your password?' });
    })
    .get('/error-page', (req, res) => {
        res.render('error-page', { title: 'Error!' });
    })

    .get('/faq', (req, res) => {
        res.render('help', { title: 'Help Center' });
    })
    .get('/login', function(req, res, next) {
        /*let token = req.cookies.auth
        User.findByToken(token, function (err,user) {
            if (user) {
                var firstStr = user.firstname,
                        lastStr = user.lastname,
                        Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0);
                res.render(
                    'dashboard', {
                        title: 'Dashboard',
                            firstname: user.firstname,
                            lastname: user.lastname,
                            initials: Initials,
                            id: user.id
                    });
            } else {*/
                res.render('login',{title:'Login'});
            //}
        //  });
    })
    .post('/dashboard', function(req, res) {
        let token = req.cookies.auth
        User.findOne({ 'email': req.body.email }, function(err, user) {
                    if (!user) return res.status(500).send('Email not found in database').render('login', { title: 'Login', errmsg: 'Email not found in database' });

                    user.comparepassword(req.body.password, (err, isMatch) => {
                        if (!isMatch) return res.status(500).send('Wrong password!')

                        user.generateToken((err, user) => {
                            if (err) {
                                console.log('could not log in user, something happened:',err)
                                return res.status(500).send('An error occured, please try again later')
                            }
                            var firstStr = user.firstname,
                                lastStr = user.lastname,
                                Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0)
                            var logindetails = {firstStr,lastStr,Initials}
                               
                            //console.log(token)
                            /*res.cookie('auth', user.token).render(
                                'dashboard', {
                                    title: 'Dashboard',
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    fullname: user.firstname + ' ' + user.lastname,
                                    initials: Initials,
                                    id: user.id
                            });*/
                            res.status(200).send({logindetails:logindetails});
                        });
                    });
                });
    })
    .post('/register', function(req, res) {
    // taking a user
    const newuser = new User(req.body);

    if (newuser.password != newuser.password2) return res.status(500).send('Passwords do not match');

    User.findOne({ email: newuser.email }, function(err, user) {
        if (user) return res.status(500).send('Email already taken');

        newuser.save((err, doc) => {
            if (err) {
                res.status(500).send('An error occured, please try again later');
                console.log('could not create user:' + doc);
            }
            res.status(200).send('Sign Up successful!')//.redirect('login')
        });
    });
    })
    .post('/login/:userId', encode, (req, res, next) => {
        return res
            .status(200)
            .json({
                success: true,
                authorization: req.authToken,
            });
    });

module.exports = router;