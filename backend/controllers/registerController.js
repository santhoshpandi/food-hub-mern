const User = require('../models/User')
const bcrypt = require('bcrypt')

const registerUser = async (req,res)=>{
  const {username,password} = req.body
  const newPassword = await bcrypt.hash(password,10)

  const duplicateUser = await User.findOne({username}).exec()
  if(duplicateUser) return res.json({
    success:false, message:'Username already exist'
  })

  const result =await User.create({
    username,password:newPassword
  })
  if(!result) return res.json({
    success:false,
    message:'Error in insertion'
  })
  
  res.json({
    success:true
  })
}

const updateUser = async (req,res) => {
  const {_id,username,password} = req.body
  
  const user = await User.findOne({_id}).exec()
  if(!user) return res.json({
    success:false,message:'Users not found'
  })

  user.username = username
  user.password = await bcrypt.hash(password,10)
  user.save()

  res.json({
    success:true
  })

}

const deleteUser = async (req,res) =>{
  const _id = req.body
  
  try{
    const user = await User.findOne({_id}).exec()
    if(!user) return res.json({
      success:false,message:'User not found'
    })
  
    await User.deleteOne({_id})
  
    res.json({
      success:true
    })
  }
  catch(err)
  {
    console.log(err.message)
  }

}

const showUser =async (req,res)=>{
  try{
    const refreshToken = req.cookies.jwt
    if(!refreshToken) return res.json({
      "message":"Login first to show user"
    })

    // console.log(refreshToken)
    const userData = await User.findOne({refreshToken:refreshToken}).exec()

    // console.log(userData)
    if(!userData) return res.json({
      "message":"User not found"
    })

    res.json({
      "success":true,
      "userData":userData
    })
    
    
  }
  catch(err){
    console.log('From showUser'+err)
  }
}



module.exports = {registerUser,updateUser,deleteUser,showUser}