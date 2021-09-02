var mongoose = require('mongoose');
const subPriceSchema = mongoose.Schema({
    vat: {
        type: String
    }
},
    {
        collection: "sub_prices"
    })
module.exports = mongoose.model('SubPrice', subPriceSchema);