const db = require('../config/index').get(process.env.NODE_ENV);
//nodemailer
var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    auth: {
        user: db.SMTP_USER,
        pass: db.SMTP_PASS
    },
    secure: true,
    tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        },
});
module.exports = transporter;