const { customer } = require("../modal/customerModal")


exports.addcustomer = async (req, res) => {
    try {
        const data = await customer.create(req.body)
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getcustomer = async (req, res) => {
    try {
        const data = await customer.find()
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getcustomerbyId = async (req, res) => {
    try {
        const data = await customer.findById({ _id: req.params.id })
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}


exports.updatecustomer = async (req, res) => {
    try {
        const data = await customer.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        )
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.deletecustomer = async (req, res) => {
    try {
        const data = await customer.deleteOne({ _id: req.params.id })
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}