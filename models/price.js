var mongoose = require('mongoose');
const priceSchema = mongoose.Schema({
    job: {
        type: String
    },
    description: {
        type: String
    }
},
    {
        collection: "price"
    })
module.exports = mongoose.model('Price', priceSchema);