const express = require('express')
const { addproduct, getproduct, updateproduct, deleteproduct, getproductbyId } = require('../controller/productController')
const product = express.Router()


product.post('/add-product', addproduct)
product.get('/get-product', getproduct)
product.put('/update-product/:id', updateproduct)
product.delete('/delete-product/:id', deleteproduct)
product.get('/get-product/:id', getproductbyId)



module.exports = product