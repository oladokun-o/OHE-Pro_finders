const User = require('../models/user')
const Jobs = require('../models/jobs')
const db = require('../config/index').get(process.env.NODE_ENV);
var fs = require('fs');
var handlebars = require('handlebars');
const transporter = require('../utils/mailer')
var router = require('../routes/index')
var passport = require('passport');

module.exports = {
    onGetLogin: async (req, res) => {
        let token = req.cookies.auth
        User.findByToken(token, function (err, user) {
            if (user)  {
            var firstStr = user.firstname,
                    lastStr = user.lastname,
                    Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0);
                res.render(
                    'dashboard', {
                    title: 'Dashboard',
                    firstname: user.firstname,
                    lastname: user.lastname,
                    fullname: user.firstname + ' ' + user.lastname,
                    initials: Initials,
                    id: user.id
                });
        } else {
                res.render('login',{title:'Login'})
        }
        })
    },
    onPostDashboard: async (req, res) => {
        let token = req.cookies.auth
        try {
            User.findByToken(token, (err, user) => {
            User.findOne({ 'email': req.body.email }, function(err, user) {
                if (!user) return res.render('login', { title: 'Login', errmsg: 'Email not found in database' });

                user.comparepassword(req.body.password, (err, isMatch) => {
                    if (!isMatch) return res.render('login', { title: 'Login', errmsg: "Wrong password!" });

                    user.generateToken((err, user) => {
                        if (err) {
                            console.log('could not log in user, something happened:',err)
                            return res.render('login', { title: 'Login', errmsg: 'An error occured, please try again later' });
                        }
                        var firstStr = user.firstname,
                            lastStr = user.lastname,
                            Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0);
                            
                          //console.log(token)
                        res.cookie('auth', user.token).render(
                            'dashboard', {
                                title: 'Dashboard',
                                firstname: user.firstname,
                                lastname: user.lastname,
                                fullname: user.firstname + ' ' + user.lastname,
                                initials: Initials,
                                id: user.id
                            });
                    });
                });
            });
    });
        } catch (error) {
            return res.redirect('login');
            //console.log(error)
        }
    },
    onRegister: async (req, res) => {
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
    },
    onGetLoggedInPages: async (req,res) => {
    let token = req.cookies.auth
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
                                fullname: user.firstname + ' ' + user.lastname,
                                initials: Initials,
                                id: user.id
                        });
                } else {
                     res.redirect('login');
                }
            });
    },
    onGetLogout: async function  (req,res) {
    let token = req.cookies.auth;
    req.user.deleteToken(token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.render('index', { title: 'OHE' });
    });
    },
    onGetUpdates: async function  (req,res) {
        const getUpdatesMailData = {
        from: db.SMTP_USER, // sender address
        to: req.body.email, // list of receivers
        subject: req.body.subject,
        text: req.body.message
        };
    transporter.sendMail(getUpdatesMailData, function(err, info) {
        if (err) {
            console.log(err);
            res.status(500).send(err); // <----- HERE
        } else {
            console.log("Successfully sent email.");
            res.send("OK"); // <------------- HERE
        }
    });

    },
    onPostResetPassword: async function  (req,res) {
        User.emailCheck(req.body.email, (err, user) => {
        if (user) {
            var FbUserData = {
                fbId: user.facebookId
            }
            var GooUserData = {
                    gooId: user.googleId
                }
                //let result = 'facebookId' in user;
                //console.log(result); // true        
            var logintype;
            if (FbUserData.fbId == undefined) {
                logintype = 'Google';
            } else if (GooUserData.gooId == undefined) {
                logintype = 'Facebook';
            }
            //console.log(logintype)
            if (FbUserData.fbId !== undefined || GooUserData.gooId !== undefined) {
                // Tell client the user logs in with face book login
                var Relogger = req.body.email;
                //console.log(Relogger + ' ' + 'logs in OHE with ' + ' ' + logintype + ' ' + ' login!');
                res.status(500).send(Relogger + ' ' + 'logs in OHE with ' + ' ' + logintype + ' ' + ' login!');
            } else {
                user.generatePasswordReset();
                user.save();
                let link = "http://" + req.headers.host + "/reset-password/" + user.resetPasswordToken;
                fs.readFile('./utils/emails/index.html', { encoding: 'utf-8' }, function(err, html) {
                    if (err) {
                        console.log(err);
                    } else {
                        var template = handlebars.compile(html);
                        var replacements = {
                            username: user.firstname + ' ' + user.lastname,
                            link: link,
                        };
                        var htmlToSend = template(replacements);
                        var forgotFormdata = {
                            from: db.SMTP_USER,
                            to: req.body.email,
                            subject: req.body.subject,
                            html: htmlToSend
                        }
                    }

                    transporter.sendMail(forgotFormdata, function(err, info) {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Something went wrong, please try again later'); // <----- HERE
                        } else {
                            //console.log("Successfully sent email.");
                            res.send("OK"); // <------------- HERE
                        }
                    })
                });
            }
        } else if (!user) {
            // Tell client that the email does not exist.
            var Relogger = req.body.email;
            console.log(Relogger + 'does not exist in database');
            res.status(500).send(Relogger + ' ' + 'does not exist in our database');
        }
    })
    },
    onGetResetPasswordToken: async function  (req,res) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
        .then((user) => {
            if (!user) return res.status(401).render('error-page', { title: 'Error!', pwderr: 'Password reset token is invalid or has expired.' });

            //Redirect user to form with the email address
            res.render('reset-password', { title: 'Reset Password', user });
        })
        .catch(err => res.status(500).render('error-page', { pwderr: err.message }));
    },
    onPostResetPasswordToken: async function  (req,res) {
        //res.render('reset-password', { title: 'Reset your password' });
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            res.status(401).send('Password reset token is invalid or has expired.');
        } else {
            //Set the new password
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            // Save
            user.save((err) => {
                if (err) return res.status(500);

                else {
                    fs.readFile('./utils/emails/pass-changed.html', { encoding: 'utf-8' }, function(err, html) {
                        if (err) {
                            console.log(err);
                        } else {
                            var template = handlebars.compile(html);
                            var replacements = {
                                username: user.firstname + ' ' + user.lastname,
                                email: user.email,
                            };
                            var htmlToSend = template(replacements);
                            var passData = {
                                from: db.SMTP_USER,
                                to: user.email,
                                subject: req.body.subject,
                                html: htmlToSend
                            }
                        }

                        transporter.sendMail(passData, function(err, info) {
                            if (err) {
                                console.log(err);
                                res.status(500).send('Something went wrong, please try again later'); // <----- HERE
                            } else {
                                console.log("Successfully sent email.");
                                res.send("OK"); // <------------- HERE
                            }
                        })
                    });
                }
            });
        }
    })
    },
    onPostJobs: async function  (req,res) {
        var jobtype = req.body.subject;
    Jobs.find({ $or: [{ job: jobtype }, { tag: jobtype }] }, function(err, users) {
        if (err || Object.keys(users).length == 0) {
            //console.log('wronggg')
            res.status(404).send('Sorry' + ' ' + jobtype + ' ' + 'was not found');
        } else {
            res.status(200).send(users.map((userMap) => {
                //userMap[item._id] = item
                //console.log('success' + ' ' + userMap.job)
                return userMap.job
            }))

        }
    })
    },
    onGetGoogleCB: async function  (req,res) {
        let token = req.cookies.auth
    User.findByToken(token, function (err,user) {
        if (err) {
            return res.redirect('login')
        } else if (!user) {
        
            User.findOne({ email: req.user.email }, function (err, user) {
                if (!user) return res.render('login', { title: 'Login', errmsg: "Email already exists" });

                var firstStr = user.firstname,
                    lastStr = user.lastname,
                    Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0);
                user.generateToken((err, user) => {
                    if (err) return res.redirect('login');
                    res.cookie('auth', user.token).render(
                        'dashboard', {
                        title: 'Dashboard',
                        firstname: user.firstname,
                        lastname: user.lastname,
                        fullname: user.firstname + ' ' + user.lastname,
                        initials: Initials,
                        id: user.id
                    });
                })
            })
        }
        })
    },
    onPostContact: async function  (req,res) {
        fs.readFile('./utils/emails/auto-reply.html', { encoding: 'utf-8' }, function(err, html) {
            if (err) {
                console.log(err);
            } else {
                var template = handlebars.compile(html);
                var replacements = {
                    username: req.body.name,
                };
                var htmlToSend = template(replacements);
                var userData = {
                    from: db.SMTP_USER,
                    to: req.body.email,
                    subject: 'We got your message! Here’s what to expect',
                    html: htmlToSend
                }
            }

            transporter.sendMail(userData, function(err, info) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Something went wrong, please try again later'); // <----- HERE
                } else {
                    console.log("Successfully sent  to user.");
                    res.send("OK"); // <------------- HERE
                }
            })
        })
        fs.readFile('./utils/emails/new-contact.html', { encoding: 'utf-8' }, function(err, html) {
            if(err){
                console.log(err)
            } else {
                var template = handlebars.compile(html);
                var messages = {
                    name: req.body.name,
                    email: req.body.email,
                    subject: req.body.subject,
                    message: req.body.message
                };
                
                var userMsgs = template(messages);
                var userDatatoOwner = {
                    from: db.SMTP_USER,
                    to: 'olanrewaju.oe@gmail.com,oladipupooladokun@gmail.com',
                    subject: 'New Contact Message',
                    html: userMsgs
                }
                //console.log(userDatatoOwner)
            }
            transporter.sendMail(userDatatoOwner, function(err, info) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error sending user info back'); // <----- HERE
                } else {
                    console.log("Successfully sent email back to help center.");
                    res.send("OK"); // <------------- HERE
                }
            })
        })
    },
    onPostClientMsg: async function  (req,res) {
        var messageDetails = req.body.subject,
        token = req.cookies.auth;
    if(token){
        res.status(200).send('success');
        console.log(messageDetails)
    } else{
        res.status(500).send('error');
    }
    }
}