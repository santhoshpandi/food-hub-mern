import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from './UserContext'

export const BillContext = createContext()

export function BillProvider({ children }) {

  const { userData,showUser,refreshAccessToken } = useUser()
  //From the Form
  const [billData, setBillData] = useState({
    userId:'', date: '', name: '', mobile: '', foodItems: '', quantity: ''
  })

  //To displaying the bill data
  const [bills,setBills] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    if(!userData){
      showUser()      
    }
    
    if (userData._id) {
      // Update userId in billData only if userData is available
      setBillData((prevState) => ({
        ...prevState,
        userId: userData._id
      }));

      showBillData()
    }
  }, [userData]);


  async function  showBillData() {
    try{
      const response = await axios.get('http://localhost:3000/api/bill/',{
        withCredentials:true
      })
      if(response.data.success){
        const allBill = response.data.billData
        const filteredBills = allBill.filter((bill)=>(
          bill.userId === userData._id
        ))
        setBills(()=>filteredBills)
      }
      else if (response.data === 'Invalid Token') {
        console.log('Attempting Refresh token');
        await refreshAccessToken();
        await showBillData()         
      }
      else{
        console.log(response)
      }
    }
    catch(err)
    {
      console.log('showBill '+err)
    }
  }

  async function  deleteBillData(id) {
    try{
      const response = await axios.delete(`http://localhost:3000/api/bill/${id}`,{
        withCredentials:true
      })
      if(response.data.success){        
        alert(response.data.message) 
        await showBillData()
      }
      else if (response.data === 'Invalid Token') {
        console.log('Attempting Refresh token');
        await refreshAccessToken();
        await deleteBillData(id)                 
      }
      else{
        console.log(response.data.message)
      }
    }
    catch(err)
    {
      console.log('deleteBill '+err)
    }
  }


  async function submitData(billData) {     
    
    const regex = /^[1-9]\d{9}$/
    let match = regex.test(billData.mobile)
    if (!match) return (alert('Enter valid Phone Number📞'))
    try {
      console.log("submitting....")
    
      const response = await axios.post('http://localhost:3000/api/bill/', billData,{
        withCredentials: true,  // This is crucial to send cookies with the request
      })
    
      if (response.data.success) {
        //Redirecting        
        navigate(response.data.redirectUrl)
        //Reset the inputs
        setBillData({
          userId:userData._id,
          date: '',
          name: '',
          mobile: '',
          foodItems: '',
          quantity: ''
        });
        await showBillData()
        console.log('Order Booked')
      }
      else if (response.data === 'Invalid Token') {
        console.log('Attempting Refresh token');
        await refreshAccessToken();
        await submitData(billData)          
      }
      else {
        console.log('Order Booking Failed😞')             
      }
    }
    catch (err) {
      console.log('Error Occured' + err)
    }
  }

  return (
    <BillContext.Provider value={{ billData, setBillData, submitData,showBillData,deleteBillData,bills }}>
      {children}
    </BillContext.Provider>
  )
}

export function useBill() {
  return useContext(BillContext)
}