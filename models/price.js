var mongoose = require('mongoose');
const priceSchema = mongoose.Schema({
    amount: {
        type: String
    },
    currency: {
        type: String
    }
},
    {
        collection: "price"
    })
module.exports = mongoose.model('Price', priceSchema);