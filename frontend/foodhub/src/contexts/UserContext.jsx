import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'


export const UserContext = createContext()

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    showUser()
    
  },[])

   // ------------- Refreshing Access Token -------------
   async function refreshAccessToken(){
    const response = await axios.get('http://localhost:3000/api/refresh/',{
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
      const response = await axios.post('http://localhost:3000/api/user/register', userData, {
        withCredentials: true
      })

      if (response.data.success) {
        alert('Successfully Registered☺')
        return response.data.userData
      }
      else {
        alert(response.data.message)
      }

    }
    catch (err) {
      console.log("Error in Registering " + err)
    }

  }

  async function loginUser(loginData, event) {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', loginData, {
        withCredentials: true
      })
  
      if (response.data.success) {
        setUserData({
          ...userData,
          _id: response.data.userData._id
        })
        console.log("🗝" + response.data.accessToken)       
        
        navigate(response.data.redirectUrl)
      }
      else {
        alert(response.data.message)
      }

    }
    catch (err) {
      alert('Error in Login ' + err)
    }
  }

  //store the data when reloads
  async function showUser() {
    const response = await axios.get('http://localhost:3000/api/user/register', {
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

  async function updateUser(userData) {

    const response = await axios.put('http://localhost:3000/api/user/register', userData, {
      withCredentials: true
    })
    if (response.data.success) {
      alert('Succesfully updated')
    }
    else {
      alert(response.data.message)
    }

  }

  async function deleteUser(_id) {
    const response = await axios.delete('http://localhost:3000/api/user/register', {
      data: { _id }
    }, {
      withCredentials: true,  // This is crucial to send cookies with the request
    })
    
    if (response.data.success) {
      setUserData({})
      alert('Succesfully Account Deleted')
      navigate('/')
    }
    else {
      alert(response.data.message)
    }
  }

  async function logoutUser(_id){
    const response = await axios.get('http://localhost:3000/api/user/logout',{
      withCredentials:true
    })
    if(response.data.success){
      window.location.href = response.data.redirectUrl
    }
    else{
      alert('from logout '+response.data.message)
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