const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username:String,
  password:String,
  refreshToken:String
})

const User = mongoose.model('users',UserSchema)

module.exports = User

