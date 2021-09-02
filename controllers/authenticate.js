const User = require('../models/user')
const Jobs = require('../models/jobs')
const JobsList = require('../models/job-list')
const Chat = require('../models/ChatRoom')
const db = require('../config/index').get(process.env.NODE_ENV);
var fs = require('fs');
var handlebars = require('handlebars');
const transporter = require('../utils/mailer')
var router = require('../routes/index')
var passport = require('passport');
const Support = require('../models/support');
const jobs = require('../models/jobs');
const jobList = require('../models/job-list');
const { response } = require('express');
const Price = require('../models/price')
const SubPrice = require('../models/sub-price')
const crypto = require('crypto')
module.exports = {
    onGetHome: async (req,res) => {
        let token = req.cookies.auth
        User.findByToken(token, function (err, user) {
            if (user) {
                var firstStr = user.firstname,
                    lastStr = user.lastname,
                    Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0);
                res.render(
                    '', {
                    title: 'OHE',
                    firstname: user.firstname,
                    lastname: user.lastname,
                    fullname: user.firstname + ' ' + user.lastname,
                    initials: Initials,
                    id: user._id,
                    email: user.email,
                    phone: user.phone,
                    addressI: user.addressI,
                    addressII: user.addressII,
                });
                console.log('heya')
            } else {
                res.render('', 
                { title: 'OHE' })
            }
        })
    },
    onGetLogin: async (req, res) => {
        let token = req.cookies.auth
        User.findByToken(token, function (err, user) {
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
                    id: user._id,
                    email: user.email,
                    phone: user.phone,
                    addressI: user.addressI,
                    addressII: user.addressII,
                });
            } else {
                res.render('login', { title: 'Login' })
            }
        })
    },
    onPostDashboard: async (req, res) => {
        let token = req.cookies.auth
        try {
            if (req.cookies.type == 'support') {
                Support.findByToken(token, (err, user) => {
                Support.findOne({ 'email': req.body.email }, function (err, user) {
                    if (!user) {
                        return res.render('login', { title: 'Login', errmsg: 'Uh oh, you should not be here.<br>This page is for authorized personnel only' });
                    } else {
                    user.comparepassword(req.body.password, (err, isMatch) => {
                        if (!isMatch) return res.render('login', { title: 'Login', errmsg: "Wrong password!" });

                        user.generateToken((err, user) => {
                            if (err) {
                                console.log('could not log in user, something happened:', err)
                                return res.render('login', { title: 'Login', errmsg: 'An error occured, please try again later' });
                            }
                            var firstStr = user.firstname,
                                lastStr = user.lastname,
                                Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0)
                            
                            //console.log(token)
                            res.header('authorization', 'Bearer ' + user.token)
                            res.cookie('auth', user.token)
                            res.render('dashboard', {
                                title: 'Dashboard',
                                firstname: user.firstname,
                                lastname: user.lastname,
                                fullname: user.firstname + ' ' + user.lastname,
                                initials: Initials,
                                id: user._id,
                                email: user.email,
                                phone: user.phone,
                                addressI: user.addressI,
                                addressII: user.addressII,
                            });
                        });
                    });
                    }
                });
            })
            } else {
            User.findByToken(token, (err, user) => {
                User.findOne({ 'email': req.body.email }, function (err, user) {
                    if (!user) return res.render('login', { title: 'Login', errmsg: 'Email not found in database' });

                    user.comparepassword(req.body.password, (err, isMatch) => {
                        if (!isMatch) return res.render('login', { title: 'Login', errmsg: "Wrong password!" });

                        user.generateToken((err, user) => {
                            if (err) {
                                //console.log('could not log in user, something happened:', err)
                                return res.render('login', { title: 'Login', errmsg: 'An error occured, please try again later' });
                            }
                            var firstStr = user.firstname,
                                lastStr = user.lastname,
                                Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0)
                            
                            //console.log(token)
                            res.header('authorization', 'Bearer ' + user.token)
                            res.cookie('auth', user.token)
                            res.render('dashboard', {
                                title: 'Dashboard',
                                firstname: user.firstname,
                                lastname: user.lastname,
                                fullname: user.firstname + ' ' + user.lastname,
                                initials: Initials,
                                userId: user._id,
                                email: user.email,
                                phone: user.phone,
                                addressI: user.addressI,
                                addressII: user.addressII,
                            });
                            //console.log(user._id)
                        });
                    });
                });
            });
            }  
        } catch (error) {
            console.log(error)
            return res.redirect('login');
            //console.log(error)
        }
    },
    onRegister: async (req, res) => {
        // taking a user
        const newuser = new User(req.body);

        if (newuser.password != newuser.password2) return res.status(500).send('Passwords do not match');

        User.findOne({ email: newuser.email }, function (err, user) {
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
    onGetAcct: async (req, res) => {
        let token = req.cookies.auth
        User.findByToken(token, function (err, user) {
            if (user) {
                var firstStr = user.firstname,
                    lastStr = user.lastname,
                    Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0);
                res.render(
                    'setting', {
                    title: 'Account',
                    acct: true,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    fullname: user.firstname + ' ' + user.lastname,
                    initials: Initials,
                    id: user._id,
                    email: user.email,
                    phone: user.phone,
                    addressI: user.addressI,
                    addressII: user.addressII,
                });
            } else {
                res.render('login', { title: 'Login' })
            }
        })
    },
    onGetHelp: async (req, res) => {
        let token = req.cookies.auth
        User.findByToken(token, function (err, user) {
            if (user) {
                var firstStr = user.firstname,
                    lastStr = user.lastname,
                    Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0);
                res.render(
                    'help-center', {
                    title: 'Help & Support',
                    help: true,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    fullname: user.firstname + ' ' + user.lastname,
                    initials: Initials,
                    id: user._id,
                    email: user.email,
                    phone: user.phone,
                    addressI: user.addressI,
                    addressII: user.addressII,
                });
            } else {
                res.render('login', { title: 'Login' })
            }
        })
    },
    onPay: async (req, res) => {
        let token = req.cookies.auth
        User.findByToken(token, function (err, user) {
            if (user) {
                var firstStr = user.firstname,
                    lastStr = user.lastname,
                    Initials = firstStr.charAt(0) + '.' + lastStr.charAt(0);
                res.render(
                    'pay', {
                    title: 'Payment',
                    //acct: true,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    fullname: user.firstname + ' ' + user.lastname,
                    initials: Initials,
                    id: user._id,
                    email: user.email,
                    phone: user.phone,
                    addressI: user.addressI,
                    addressII: user.addressII,
                });
            } else {
                res.render('login', { title: 'Login' })
            }
        })
        //res.render('pay', {title: 'Payment'});
    },
    onGetPaymentDetails: async (req, res) => {
        
        Price.find({}, (err, result) => {                       
            if (result) {
                res.status(200).send(result)
                //console.log('sent')
            } else {
                res.status(404).send('No details')
                //console.log('not sent')
            }
        })
    },
    onGetSubPayment: async (req, res) => {
        SubPrice.find({},'-_id', (err, docs)=>{
            if (docs) {
                res.status(200).send(docs)
                //console.log('sent')
            } else {
                res.status(404).send('No details')
                //console.log('not sent')
            }
        })
    },
    onGetLogout: async function (req, res) {
        let token = req.cookies.auth;
        res.cookie('auth', 'none',{
            httpOnly: true,
        })
        req.user.deleteToken(token, (err, user) => {
            if (err) return res.status(400).send(err);
             res.redirect('login');
        });
    },
    onGetUpdates: async function (req, res) {
        const getUpdatesMailData = {
            from: db.SMTP_USER, // sender address
            to: req.body.email, // list of receivers
            subject: req.body.subject,
            text: req.body.message
        };
        transporter.sendMail(getUpdatesMailData, function (err, info) {
            if (err) {
                console.log(err);
                res.status(500).send(err); // <----- HERE
            } else {
                console.log("Successfully sent email.");
                res.send("OK"); // <------------- HERE
            }
        });

    },
    onPostResetPassword: async function (req, res) {
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
                    fs.readFile('./utils/emails/index.html', { encoding: 'utf-8' }, function (err, html) {
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

                        transporter.sendMail(forgotFormdata, function (err, info) {
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
                //console.log(Relogger + 'does not exist in database');
                res.status(500).send(Relogger + ' ' + 'does not exist in our database');
            }
        })
    },
    onGetResetPasswordToken: async function (req, res) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
            .then((user) => {
                if (!user) return res.status(401).render('error-page', { title: 'Error!', pwderr: 'Password reset token is invalid or has expired.' });

                //Redirect user to form with the email address
                res.render('reset-password', { title: 'Reset Password', user });
            })
            .catch(err => res.status(500).render('error-page', { pwderr: err.message }));
    },
    onPostResetPasswordToken: async function (req, res) {
        //res.render('reset-password', { title: 'Reset your password' });
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
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
                        fs.readFile('./utils/emails/pass-changed.html', { encoding: 'utf-8' }, function (err, html) {
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

                            transporter.sendMail(passData, function (err, info) {
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
    onPostJobs: async function (req, res) {
        var jobtype = req.body.subject,
            type = req.body.type;
        if (type == 'default') {
            Jobs.find({}, (err, result) => {                
                if (result) {
                    res.status(200).send(result)
                    //console.log('sent')
                } else {
                    res.status(404).send('No pros found')
                    //console.log('not sent')
                }
            })
        } else if (type == 'description') {
            Jobs.find({job: jobtype},'-_id description', (err, result) => {                
                if (result) {
                    res.status(200).send(result)
                    //console.log(result)
                } else {
                    res.status(404).send('No pros found')
                    //console.log('not sent')
                }
            })
        } else {
            Jobs.find({job: { '$regex': '^'+jobtype}}, {}, (err, result) => {                
                if (result) {
                    res.status(200).send(result)
                    //console.log('sent')
                } else {
                    res.status(404).send('No pros found')
                    //console.log('not sent')
                }
            })
        }
    },
    onGetGoogleCB: async function (req, res) {
        let token = req.cookies.auth
        User.findByToken(token, function (err, user) {
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
                            id: user._id,
                            email: user.email,
                            phone: user.phone,
                            addressI: user.addressI,
                            addressII: user.addressII,
                        });
                    })
                })
            }
        })
    },
    onFacebookCb: async function (req, res) {
        var useremailvar = { email: req.user.email || req.body.email };
    if (useremailvar.email == undefined) {
        console.log('no email for this user, rendering email form')
        var user_email_msg = req.user.firstname + ' ' + 'there is no email for this account, enter and confirm your email address';
        var fullname = req.user.firstname + ' ' + req.user.lastname;
        var userId = req.user.id;
        res.render('email-form', { title: 'Update Email', mail_msg: user_email_msg, fullname: fullname, userid: userId });
    } else {
        User.findOne({ email: req.user.email }, function(err, user) {
            if (user) {
                user.generateToken((err, user) => { 
                    if (err) return res.redirect('login');
                    res.cookie('auth', user.token).render(
                        'dashboard', {
                            title: 'Dashboard',
                            firstname: user.firstname,
                            lastname: user.lastname,
                        })
                })
            } else {
                console.log(err);
                return res.render('login', { title: 'Login', errmsg: 'An error occured, please try again later' });
            }
        })
    }

    },
    onUpdateEmail: async function (req, res) {
        var oldEmail = req.body.oldemail,
            newEmail = {
                email: req.body.newemail
            },
            condition = {
                email: oldEmail
            }
        //console.log(req.body.id)
        User.findById(req.body.id, (err, user) => {
            if (user.email == oldEmail) {
                user.generateEmailUpdate();
                user.save();

                var oldUserToken = user.updateEmailToken,
                    oldUserFirstname = user.firstname;
                User.emailCheck(newEmail.email, (err, user) => {                    
                    if (user) {
                        res.status(500).send('Sorry, that email already exists')
                    } else {
                        User.emailCheck(newEmail.email, (err, result) => {
                            if (err) {
                                res.status(500).send('An error occured, please try again later');
                            } else {
                                

                                let link = "http://" + req.headers.host + "/update-email/" + newEmail.email + '/' + oldUserToken;
                                fs.readFile('./utils/emails/update-email.html', { encoding: 'utf-8' }, function (err, html) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var template = handlebars.compile(html);
                                        var replacements = {
                                            username: oldUserFirstname,
                                            usermail: newEmail.email,
                                            link: link,
                                            msg: 'You are receiving this email because you or someone asked to change your email address for your OHE account. If you did not request to change your email, please let us know immediately by replying to this email.'
                                        };
                                        var emailUpdate = template(replacements);
                                        var updateEmailData = {
                                            from: db.SMTP_USER,
                                            to: oldEmail,
                                            subject: 'Verify your new email',
                                            html: emailUpdate
                                        }
                                    }

                                    transporter.sendMail(updateEmailData, function (err, info) {
                                        if (err) {
                                            console.log(err);
                                            res.status(500).send('Something went wrong, please try again later'); // <----- HERE
                                        } else {
                                            //console.log("Successfully sent update mail.");
                                            res.status(200).send('Check your mail inbox for confirmation link');
                                        }
                                    })
                                });                                
                            }
                        })
                  }
                })
            } else {
                res.status(404).send('Please enter your correct current email address')
            }
        })
        /*User.emailCheck(req.body.email, (err, user) => {
             if (user) {
                // Tell client that the email does exists.
                //console.log('that email is associated with an account in database');
                res.status(500).send('Email address already exists in our database');
            } else if (!user) {
                User.findById({ _id: req.body.userid }, (err, user) => {
                    if (user) {
                        user.generateEmailUpdate();
                        user.save();
                        
                        let link = "http://" + req.headers.host + "/update-email/" + req.body.email + '/' + user.updateEmailToken;
                        fs.readFile('./utils/emails/update-email.html', { encoding: 'utf-8' }, function (err, html) {
                            if (err) {
                                console.log(err);
                            } else {
                                var template = handlebars.compile(html);
                                var replacements = {
                                    username: req.body.fullname,
                                    usermail: req.body.email,
                                    link: link,
                                };
                                var emailUpdate = template(replacements);
                                var updateEmailData = {
                                    from: db.SMTP_USER,
                                    to: req.body.email,
                                    subject: req.body.subject,
                                    html: emailUpdate
                                }
                            }

                            transporter.sendMail(updateEmailData, function (err, info) {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send('Something went wrong, please try again later'); // <----- HERE
                                } else {
                                    console.log("Successfully sent update mail.");
                                    res.send("OK"); // <------------- HERE
                                }
                            })
                        });
                    } else {
                        console.log('something went wrong somewhere');
                        res.status(500).send('Something went wrong somewhere, please try again later');
                    }
                })

            }
        })*/
    },
    onEmailUpdated: async function (req, res) {
         User.findOne({ updateEmailToken: req.params.token, updateEmailExpires: { $gt: Date.now() } })
            .then((user) => {
                if (!user) return res.status(401).render('error-page', { title: 'Error!', pwderr: 'For security reasons, email update token is now invalid or has expired.' });

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
    },
    onPostContact: async function (req, res) {
        fs.readFile('./utils/emails/auto-reply.html', { encoding: 'utf-8' }, function (err, html) {
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

            transporter.sendMail(userData, function (err, info) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Something went wrong, please try again later'); // <----- HERE
                } else {
                    console.log("Successfully sent  to user.");
                    res.send("OK"); // <------------- HERE
                }
            })
        })
        fs.readFile('./utils/emails/new-contact.html', { encoding: 'utf-8' }, function (err, html) {
            if (err) {
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
            transporter.sendMail(userDatatoOwner, function (err, info) {
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
    onPostClientMsg: async function (req, res) {
        var messageDetails = req.body.subject,
            token = req.cookies.auth;
        if (token) {
            res.status(200).send('success');
            console.log(messageDetails)
        } else {
            res.status(500).send('error');
        }
    },
    onGetRoomFromEmail: async function (req, res) {
        Support.findOne({ setChatRoomToken: req.params.token, ChatRoomTokenExpires: { $gt: Date.now() } }, (err, user) => {
            if (!user) return res.status(401).render('error-page', { title: 'Error!', pwderr: 'Access token is invalid or has expired.' })
             //Redirect user to form with the email address
            res.cookie('type', 'support')
            res.render('login', { title: 'Login', user: user, type: user.type });
        })
    },
    onProfileUpdate: async function (req, res) {
        
        var newEmail = req.body.newemail,
            update = {
                //email: newEmail,
                phone: req.body.phone,
                addressI: req.body.addressI,
                addressII: req.body.addressII,
        }
        var condition = {
            email: req.body.email
        }
        User.findOneAndUpdate(condition,update,(err, result) => {
            if (err) {
                //console.log(err)
                return res.status(500).send('An error occured, please try again later.');
            } else {
                return res.status(200).send('saved!');
            }
        })
    },
    onEmailUpdate: async function (req, res) {
        let token = req.cookies.auth
        User.findByToken(token, function (err, user) {
            if (!user) {
                return res.render('login', { errmsg: 'Oops! An error occured. Make sure you are logged in' });
            } else {
                return res.render('email-form', { title: 'Change Your Email Address', type: 'change-email', userId: user._id });
            }
        })
    },
    onGetPasswordChange: async function (req, res) {
        let token = req.cookies.auth;
        User.findByToken(token, function (err, user) {
            if (!user) {
                return res.render('login', {errmsg: 'Oops! An error occured. Make sure you are logged in'})
            } else {
                return res.render('forgot-password', { title:'Change password',id: user._id});
            }
        })
    },
    onChangePassword: async function (req, res) {
        var oldPwd = req.body.oldPwd,
            newPwd = req.body.newPwd,
            id = req.body.id,
            condition = {
                password: oldPwd,
                password2: oldPwd
            },
            update = {
                password: newPwd,
                password2: newPwd
            }
        
        if (oldPwd == newPwd) return res.status(500).send('Use a different password from your current one');
        
        User.findById(id, function (err, user) {
            if (err) {
                return res.status(500).send('An error occured, please try agin later')
            } else if (user) {
                user.comparepassword(oldPwd, (err, isMatch) => {
                    if (!isMatch) {
                        res.status(500).send('Enter your current password');
                    } else if (isMatch) {
                        //console.log('match',isMatch)
                        user.password = newPwd
                        //user.password2 = newPwd
                        user.save((err) => {
                            if (err) return res.status(500).send('An error occured, please try agin later');
                            
                            res.status(200).send('Password changed!');
                            fs.readFile('./utils/emails/pass-changed.html', { encoding: 'utf-8' }, function (err, html) {
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
                                        subject: 'Your Password was changed',
                                        html: htmlToSend
                                    }
                                }

                                transporter.sendMail(passData, function (err, info) {
                                    if (err) {
                                        console.log(err);                                       
                                    }
                                })
                            })
                        })
                    } else if (err) {
                        return res.status(500).send('An error occured, please try agin later')
                    }
                })
            }
        })
    },
    getJobList: async function (req, res) {
        res.render('work', { title: 'Browse Jobs', id: undefined });
    }
}