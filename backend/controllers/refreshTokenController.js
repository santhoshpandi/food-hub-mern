const User = require('../models/User')
const jwt = require('jsonwebtoken')
const isProduction = process.env.NODE_ENV !== 'development';

// Handles the Refresh Token  'api/refresh/'
const handleRefreshToken = async (req, res) => {
  // console.log('re wokring')
  const cookies = req.cookies
  if (!cookies?.jwt) return res.json({
    "message": "No Cookies found"
  })
  
  // console.log(cookies.jwt)
  const refreshToken = cookies.jwt

  //Check  for user with refreshToken
  const loginUser = await User.findOne({ refreshToken: refreshToken }).exec()
  // console.log(loginUser)
  if (!loginUser) return res.json({ "message": "No user with refreshToken matches" })
   
  //verify JWT
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.json({
        'message':err.message
      })

      //Create a new Access Token
      const accessToken = jwt.sign(
        {
          "username": decoded.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      //Storing New Token in the Cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'Lax',
        secure: isProduction
      })
      

      res.json({
        'success':true,
        'message':'New Access Token Assigned'
      })
    }
  )


}



module.exports = { handleRefreshToken }