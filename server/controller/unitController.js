const { unit } = require("../modal/unitModal")


exports.addunit = async (req, res) => {
    try {
        const data = await unit.create(req.body)
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getunit = async(req,res)=>{
    try {
        const data = await unit.find()
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error) 
    }
}

exports.getunitbyId = async(req,res)=>{
    try {
        const data = await unit.findById({_id:req.params.id})
        res.status(200).json({
            success: true,
            data
        }) 
    } catch (error) {
        res.send(error) 
    }
}

exports.updateunit = async(req,res)=>{
    try {
        const data = await unit.updateOne({_id:req.params.id},{$set:req.body})
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error) 
    }
}

exports.deleteunit = async(req,res)=>{
    try {
        const data = await unit.deleteOne({_id:req.params.id})
        res.status(200).json({
            success: true,
            data
        })  
    } catch (error) {
        res.send(error) 
    }
}