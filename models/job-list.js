var mongoose = require('mongoose');
const JobListSchema = mongoose.Schema({
    job: {
        type: String
    },
    description: {
        type: String
    }
},
    {
        collection: "pro-list"
    })
module.exports = mongoose.model('JobsList', JobListSchema);