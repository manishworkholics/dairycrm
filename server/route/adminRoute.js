const express = require('express')
const { register,getadmin,login } = require('../controller/adminController')
const admin = express.Router()

admin.post('/add-user', register)
admin.post('/login', login)
admin.get('/get-user', getadmin)


module.exports = admin
