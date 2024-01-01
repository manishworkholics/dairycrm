const { product } = require("../modal/productModal")



exports.addproduct = async (req, res) => {
    try {
        const data = await product.create(req.body)
        res.status(200).json({
            success: true,
            product: data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getproduct = async (req, res) => {
    try {
        const data = await product.find()
        res.status(200).json({
            success: true,
            product: data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getproductbyId = async (req, res) => {
    try {
        const data = await product.findById({ _id: req.params.id })
        res.status(200).json({
            success: true,
            product: data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.updateproduct = async (req, res) => {
    try {
        const data = await product.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        )
        res.status(200).json({
            success: true,
            product: data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.deleteproduct = async (req, res) => {
    try {
        const data = await product.deleteOne({ _id: req.params.id })
        res.status(200).json({
            success: true,
            product: data
        })
    } catch (error) {
        res.send(error)
    }
}