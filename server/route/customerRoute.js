const express = require('express')
const { addcustomer, getcustomer, updatecustomer, deletecustomer, getcustomerbyId } = require('../controller/customerController')
const customer = express.Router()


customer.post('/add-customer',addcustomer)
customer.get('/get-customer',getcustomer)
customer.get('/get-customer/:id',getcustomerbyId)
customer.put('/update-customer/:id',updatecustomer)
customer.delete('/delete-customer/:id',deletecustomer)


module.exports = customer