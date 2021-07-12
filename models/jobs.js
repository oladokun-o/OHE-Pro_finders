var mongoose = require('mongoose');
const jobSchema = mongoose.Schema({
    job: { type: String }
})
module.exports = mongoose.model('Jobs', jobSchema);