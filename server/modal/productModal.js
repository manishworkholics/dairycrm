const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number,
    },
    unit: {
        type: String
    }
}, { timestamps: true })

const product = mongoose.model('Product', ProductSchema)
module.exports = { product }