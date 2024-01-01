const mongoose = require('mongoose')

const UnitSchema = new mongoose.Schema({
    name: {
        type: String
    }
}, { timestamps: true })


const unit = mongoose.model('Unit', UnitSchema)
module.exports = { unit }