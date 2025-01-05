const Bill = require('../models/Bill')

const priceRate = {
  "Veg-Combo": 199,
  "Mutton-Combo": 499,
  "Chicken-Combo": 399,
  "Beef-Combo": 299,
}
//--------------------------------------------------------
//Creates Bill -  '/api/bill'
const createBill = async (req, res) => {
  const { name, mobile, foodItems, quantity, date, userId } = req.body

  if (!userId) return res.json({
    success: false,
    message: 'Login to access the features😃'
  })

  const totalAmount = priceRate[foodItems] * quantity
  const result = Bill.create({
    userId,
    date: new Date(date), name, mobile, foodItems, quantity, totalAmount
  })

  if (!result) return (
    res.status(404).json({
      success: false
    })
  )

  res.status(200).json({
    success: true,
    redirectUrl: "/checkout"
  })
}
//--------------------------------------------------------
//Display Bill -  '/api/bill'
const showBill = async (req, res) => {
  const billData = await Bill.find({}).exec()
  if (billData.length === 0) {
    return res.json({
      success: true,
      message: "Bill Empty",
      billData
    })
  }
  res.json({
    success: true,
    billData
  })
}
//--------------------------------------------------------
//Deletes Bill -  '/api/bill'
const deleteBill = async (req, res) => {


  const { id } = req.params
  try {
    const billData = await Bill.findOne({ _id: id }).exec()

    if (!billData) {
      return res.json({
        success: false,
        message: 'Bill Not Found'
      })
    }

    await Bill.deleteOne({ _id: id })
    res.json({
      success: true,
      message: 'Successfully Deleted'
    })
  }
  catch (err) {
    console.log(err.message)
  }

}
module.exports = { createBill, showBill, deleteBill }