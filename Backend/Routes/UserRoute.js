const express = require('express')
const route = express.Router()
const {addproduct,getproduct,addcart,processcart,removecart,checkout} = require('../Controller/UserController')

route.post('/add',addproduct)
route.get('/api/products',getproduct)
route.post('/api/cart',addcart)
route.get('/api/cart',processcart)
route.delete('/api/cart/:id',removecart)
route.post('/api/checkout',checkout)




// /api/cart
module.exports = route