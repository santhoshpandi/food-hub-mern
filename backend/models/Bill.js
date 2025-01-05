const mongoose = require('mongoose')

const BillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: String,
  mobile: Number,
  foodItems: String,
  quantity: Number,
  totalAmount: Number,
  date: Date
})

const Bill = mongoose.model('bill', BillSchema)

module.exports = Bill
