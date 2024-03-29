const express = require('express')
const {userpayamount,generateBillForMonthByUserId, addcustomer, getcustomer, updatecustomer, deletecustomer, getcustomerbyId ,addentry, report,addallentry} = require('../controller/customerController')
const customer = express.Router()


customer.post('/add-customer',addcustomer)
customer.get('/get-customer',getcustomer)
customer.get('/get-customer/:id',getcustomerbyId)
customer.put('/update-customer/:id',updatecustomer)
customer.delete('/delete-customer/:id',deletecustomer)
customer.post('/milk-buyer/:id/daily-product-entry',addentry)
customer.get('/milk-buyer/:id/monthly-product-report',report)
customer.get('/milk-buyer/generateBillForMonth',generateBillForMonthByUserId)
customer.post('/milk-buyer/bulk-daily-product-entry',addallentry)
customer.post('/milk-buyer/userpayamount',userpayamount)


module.exports = customer