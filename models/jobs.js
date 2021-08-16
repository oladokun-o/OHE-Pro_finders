var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
    job: String,
}, {
    collection: 'jobs'
});
jobSchema.index({ job: 'text' });
module.exports = mongoose.model('Jobs', jobSchema);