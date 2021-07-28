// controllers
const loggeduser = require('../controllers/authenticate')
//const user = require('../controllers/user.js')
const router = require('express').Router();
const jwt = require('../middlewares/jwt')
const { auth } = require('../middlewares/auth');
//const User = require('../models/user')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser');
router.use(cookieParser());
var passport = require('passport');
//passport middleware
router.use(passport.initialize());
router.use(passport.session());
require('../middlewares/google-passport')(passport);
require('../middlewares/fb-passport')(passport);

router
    /* GET home page. */
    .get('/', function (req, res, next) {
        res.render('', { title: 'OHE' });
    })
    .get('/contact', function (req, res, next) {
        res.render('contact', { title: 'Contact Us' });
    })
    .get('/blog', function (req, res, next) {
        res.render('blog', { title: 'Blog' });
    })
    .get('/privacy', function (req, res, next) {
        res.render('privacy-policies', { title: 'Terms and conditions' });
    })
    .get('/jobs', function (req, res, next) {
        res.render('work', { title: 'Browse Jobs' });
    })
    .get('/how-it-works', function (req, res, next) {
        res.render('how-it-works', { title: 'How it works' });
    })
    .get('/signup', function (req, res, next) {
        res.render('signup', { title: 'Sign Up' });
    })
    .get('/forgot-password', function (req, res, next) {
        res.render('forgot-password', { title: 'Forgot your password?' });
    })
    .get('/error-page', (req, res) => {
        res.render('error-page', { title: 'Error!' });
    })

    .get('/faq', (req, res) => {
        res.render('help', { title: 'Help Center' });
    })
    .get('/login', loggeduser.onGetLogin)
    .post('/dashboard', loggeduser.onPostDashboard)
    .post('/register', loggeduser.onRegister)
    .get(['/-dashboard', '/-chats', '/-jobs', '/-account', '/-help'], loggeduser.onGetLoggedInPages)
    .get('/dashboard', loggeduser.onGetLogin)
    .get('/logout', auth, loggeduser.onGetLogout)
    .post('/login/:userId', jwt.encode, (req, res, next) => {
        return res
            .status(200)
            .json({
                success: true,
                authorization: req.authToken,
            });
    })
    .post('/get-updates', loggeduser.onGetUpdates)
    .post('/reset-password', loggeduser.onPostResetPassword)
    .get('/reset-password/:token', loggeduser.onGetResetPasswordToken)
    .post('/reset-password/:token', loggeduser.onPostResetPasswordToken)
    .post('/jobs', loggeduser.onPostJobs)
    .post('/contact-us', loggeduser.onPostContact)
    .get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
    .get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), loggeduser.onGetGoogleCB)
    .post('/client-message', loggeduser.onPostClientMsg)
    .get('/reply-client/:token', loggeduser.onGetRoomFromEmail)
    .post('/update-email', loggeduser.onChangeEmail)
    .get('/update-email/:email/:token', (req, res) => {
        User.findOne({ updateEmailToken: req.params.token, updateEmailExpires: { $gt: Date.now() } })
            .then((user) => {
                if (!user) return res.status(401).render('error-page', { title: 'Error!', pwderr: 'For security reasons, email update token is invalid or has expired.' });

                //confirm user and login automatically
                var usermail = req.params.email;
                //set new email and save
                user.email = usermail
                user.save((err) => {
                    if (err) return res.status(500);
                    else { res.render('stat', { title: 'OHE', email: usermail }); }
                })
            })
            .catch(err => res.status(500).render('error-page', { pwderr: err.message }));
    });
module.exports = router;