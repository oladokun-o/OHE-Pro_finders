var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsletterSchema = new Schema({
    email: String,
}, {
    collection: 'subscribed_emails'
});

module.exports = mongoose.model('newsLetter', newsletterSchema);