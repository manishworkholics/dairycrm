const express = require('express')
const { getunit, getunitbyId, addunit, updateunit, deleteunit } = require('../controller/unitController')
const unit = express.Router()


unit.get('/get-unit', getunit)
unit.get('/get-unit/:id', getunitbyId)
unit.post('/add-unit', addunit)
unit.put('/update-unit/:id', updateunit)
unit.delete('/delete-unit/:id', deleteunit)

module.exports = unit