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
            product_name: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
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
    totalamount: {
        type: Number,
        default:0,
    },
    paidamount: {
        type: Number,
        default:0,
    },
    //oldpendingamount jo amount last month bach gaya vo yaha update hoga
    oldpendingamount: {
        type: Number,
        default:0,
    },
    // Sara calculation due amount me he
    dueamount: {
        type: Number,
        default:0,
    },
    dailyentryamount: {
        type: Number,
        default:0,
    },
    paymenthistory: [
        {
            billmonth: { type: String },
            totalamountpaidtoday: {type: Number },
            amountdueagain: {type: Number },
            paymentdate:{ type: Date,default: Date.now  }
        }
    ],
    
}, { timestamps: true })


const customer = mongoose.model('Customer', CustomerSchema)
module.exports = { customer }