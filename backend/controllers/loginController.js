const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).exec()

  if (!user) return res.json({
    success: false, message: 'Username not found'
  })

  const matches = await bcrypt.compare(password, user.password)
  if (!matches) return res.json({
    success: false, message: 'Password is Wrong'
  })

  //jwt------------------------------------------------------
  const accessToken = jwt.sign(
    {
      "username": user.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '5s' }
  )

  const refreshToken = jwt.sign(
    { "username": user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  )

  //Saving refresh token with current user
  user.refreshToken = refreshToken
  const result = await user.save()


  // console.log(result)


  //Storing Tokens in the Cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'Lax',
    secure: false
  })
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    sameSite: 'Lax',
    secure: false
  })

  // console.log('from logincontroller ' + refreshToken)
  // console.log('to loginControlle' + req.cookies.jwt)

  //------------------------------------------------------
  res.json({
    success: true, redirectUrl: '/home', userData: user, accessToken
  })

}

module.exports = { loginUser }