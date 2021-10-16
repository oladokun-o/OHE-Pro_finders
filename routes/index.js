// controllers
const loggeduser = require('../controllers/authenticate')
const nav = require('../controllers/nav')
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
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());


router
    /* GET home page. */
    .get('/', loggeduser.onGetHome)
    .get('/contact', function (req, res, next) {
        res.render('contact', { title: 'Contact Us' });
    })
    .get('/blog', function (req, res, next) {
        res.render('blog', { title: 'Blog' });
    })
    .get('/privacy', function (req, res, next) {
        res.render('privacy-policies', { title: 'Terms and conditions' });
    })
    .get('/jobs', loggeduser.getJobList)
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
    .get('/questions', (req, res) => {
        res.render('general', { title: 'General Questions' });
    })
    .get('/expatriates', loggeduser.getExpatriates)
    .post('/expatriates-list', loggeduser.getExpatriatesList)
    .post('/expatriates-description', loggeduser.getExpatriatesDescription)
    .get('/login', loggeduser.onGetLogin)
    .post('/dashboard', loggeduser.onPostDashboard)
    .post('/register', loggeduser.onRegister)
    .get('/help', loggeduser.onGetHelp)
    .get(['/settings', '/account'], loggeduser.onGetAcct)
    .get('/pay', loggeduser.onPay)
    .post('/make-payment', loggeduser.onMakePayment)
    .post('/payment-details', loggeduser.onGetPaymentDetails)
    .post('/subpayment-details', loggeduser.onGetSubPayment)
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
    .get('/facebook', passport.authenticate('facebook', { scope: 'email' }))
    .get('/facebook/callback/dashboard', passport.authenticate('facebook', { failureRedirect: '/login' }), loggeduser.onFacebookCb)
    .post('/client-message', loggeduser.onPostClientMsg)
    .get('/reply-client/:token', loggeduser.onGetRoomFromEmail)
    .post('/update-email', loggeduser.onUpdateEmail)
    .get('/update-email/:email/:token', loggeduser.onEmailUpdated)
    .post('/profile-update', loggeduser.onProfileUpdate)
    .get('/email-update', loggeduser.onEmailUpdate)
    .get('/change-password', loggeduser.onGetPasswordChange)
    .post('/change-password', loggeduser.onChangePassword)
    //.get('/-chats', nav.getChat)
module.exports = router;