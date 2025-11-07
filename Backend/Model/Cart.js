const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema(
  {
    pid:{
      type:mongoose.Schema.ObjectId,
      ref:'Product'
    },
    qyt: {
      type: Number
      
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Cart', CartSchema)
