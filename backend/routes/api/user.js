const express = require('express')
const router = express.Router()
const {registerUser,updateUser,deleteUser,showUser} = require('../../controllers/registerController')
const {loginUser} = require('../../controllers/loginController')
const {logoutUser} = require('../../controllers/logoutController')

router.route('/register')
.post(registerUser)
.put(updateUser)
.delete(deleteUser)
.get(showUser)

router.route('/login')
.post(loginUser)

router.route('/logout')
.get(logoutUser)


module.exports = router