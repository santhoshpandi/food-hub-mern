const User = require('../models/User')

// Handles the Logout  'api/user/logout/'
const logoutUser = async (req, res) => {
  
  const cookies = req.cookies
  if (!cookies?.jwt) return res.json({
    message: 'There is No Cookies to be deleted'
  })
  const refreshToken = cookies.jwt

  //Check  for user with refreshToken
  const loginUser = await User.findOne({ refreshToken }).exec()
  console.log('From logoutController')
  console.log(loginUser)
  console.log('skdfjl')

  //Clears the cookie
  if (!loginUser) {
    //Deleting Refresh token
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: false
    })
    //Deleting Accesstoken
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'None',
      secure: false
    })
    return res.json({
      message:'Cookies Cleared..  User not found..'
    })
  }

  //Delete Refresh Token - Update in the Database
  loginUser.refreshToken = ''
  await loginUser.save()

  //Deleting RefreshToken
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: false
  })

  //Deleting Accesstoken
  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: false
  })


  res.json({
    success:true,
    redirectUrl:'/'
  })

}



module.exports = { logoutUser }