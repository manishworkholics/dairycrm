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
            value1: { type: String },
            value2: { type: String },
        }
    ],
    adress: {
        type: String
    },
}, { timestamps: true })


const customer = mongoose.model('Customer', CustomerSchema)
module.exports = { customer }