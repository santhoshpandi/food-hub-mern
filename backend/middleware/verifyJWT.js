const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next)=>{
  // const authHeader = req.headers.authorization || req.headers.Authorization
  // if(!authHeader?.startsWith('Bearer')) return res.json({"message":"Auth Header (Bearer Token) not found"})
  // console.log(authHeader) //Bearer token
  // const token = authHeader.split(' ')[1]
  console.log('From verifyJWT.js')
  console.log(req.cookies)
  const token = req.cookies.accessToken
  if(!token) return res.json({"message":"Access Token not Found"})
  
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,  
    (err,decoded)=>{
      if(err) return res.send("Invalid Token")
      req.user = decoded.username
      next()
    }
  )
}

module.exports = verifyJWT