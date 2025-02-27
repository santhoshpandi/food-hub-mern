import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import { useSnackbar } from "notistack";

export const UserContext = createContext()

export function UserProvider({ children }) {
  
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    showUser()    
  },[])

   // ------------- Refreshing Access Token -------------
   async function refreshAccessToken(){
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URI}
/api/refresh/`,{
      withCredentials:true
    })

    if(response.data.success){
      console.log(response.data.message)
    }
    else{
      console.log("from refreshAcesstoken "+response.data.message)
    }
  }

  async function registerUser(userData, event) {
    event.preventDefault()

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URI}
/api/user/register`, userData, {
        withCredentials: true
      })

      if (response.data.success) {
        enqueueSnackbar('Successfully Registered',{variant:'success'})
        return response.data.userData
      }
      else {
        enqueueSnackbar(response.data.message,{variant:'error'})
      }

    }
    catch (err) {
      console.log("Error in Registering " + err)
      enqueueSnackbar(err.message,{variant:'error'})
    }

  }

  async function loginUser(loginData, event) {
    event.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URI}
/api/user/login`, loginData, {
        withCredentials: true
      })
  
      if (response.data.success) {
        setUserData({
          ...userData,
          _id: response.data.userData._id
        })
        console.log("🗝" + response.data.accessToken) 
        navigate(response.data.redirectUrl)        
        enqueueSnackbar('Logined Successfully!',{variant:'success'})       
      }
      else {
        enqueueSnackbar(response.data.message,{variant:'error'})
      }

    }
    catch (err) {
      enqueueSnackbar(err.message,{variant:'error'})
    }
  }

  //store the data when reloads
  async function showUser() {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URI}
/api/user/register`, {
      withCredentials: true
    })
    if (response.data.success) {
      const data = response.data.userData
      setUserData(data)
    }
    else {
      console.log(response.data.message)
    }
  }

  async function updateUser(userData,event) {

    event.preventDefault()
    const response = await axios.put(`${import.meta.env.VITE_APP_API_URI}
/api/user/register`, userData, {
      withCredentials: true
    })
    if (response.data.success) {
      console.log('updated')
      enqueueSnackbar('Successfully Updated!',{variant:'success'})

    }
    else {
      enqueueSnackbar(response.data.message,{variant:'error'})
    }

  }

  async function deleteUser(_id) {
    const response = await axios.delete(`${import.meta.env.VITE_APP_API_URI}
/api/user/register`, {
      data: { _id }
    }, {
      withCredentials: true,  // This is crucial to send cookies with the request
    })
    
    if (response.data.success) {
      setUserData({})
      navigate('/')
      enqueueSnackbar('Successfully Account Deleted',{variant:'success'})
    }
    else {
      enqueueSnackbar(response.data.message,{variant:'error'})
    }
  }

  async function logoutUser(_id){
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URI}
/api/user/logout`,{
      withCredentials:true
    })
    if(response.data.success){
      enqueueSnackbar('Logged Out Successfully!',{variant:'success'}) 
      window.location.href = response.data.redirectUrl         
    }
    else{
      enqueueSnackbar(response.data.message,{variant:'error'})
    }
  }

  return (
    <UserContext.Provider value={{ userData, setUserData, registerUser, deleteUser, loginUser, updateUser,logoutUser,showUser, refreshAccessToken }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}