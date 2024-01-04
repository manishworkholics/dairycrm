const mongoose = require('mongoose')


const CustomerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    number: {
        type: Number
    },
    product: [
        {
            id: { type: String },
            product_name: { type: mongoose.Schema.Types.ObjectId,ref: "Product" },
            product_quantity: { type: String },
        }
    ],
    dailyEntries: [
        {
            date: Date,
            products: []
        }
    ],
    adress: {
        type: String
    },
}, { timestamps: true })


const customer = mongoose.model('Customer', CustomerSchema)
module.exports = { customer }