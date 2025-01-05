const express = require('express')
const router = express.Router()
const {createBill,showBill,deleteBill} = require('../../controllers/billController')

router.route('/bill')
.post(createBill)
.get(showBill)

router.route('/bill/:id')
.delete(deleteBill)

module.exports = router