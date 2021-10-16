var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expSchema = new Schema({
    job: String,
}, {
    collection: 'expatriates'
});
expSchema.index({ job: 'text' });
module.exports = mongoose.model('Expatriates', expSchema);