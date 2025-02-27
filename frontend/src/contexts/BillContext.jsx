import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from './UserContext'
import { useSnackbar } from "notistack";

export const BillContext = createContext()

export function BillProvider({ children }) {

  const { userData,showUser,refreshAccessToken } = useUser()
    const { enqueueSnackbar } = useSnackbar()
  
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
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URI}
/api/bill/`,{
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
        // console.log(response)
      }
    }
    catch(err)
    {
      console.log('showBill '+err.message)
    }
  }

  async function  deleteBillData(id) {
    try{
      const response = await axios.delete(`${import.meta.env.VITE_APP_API_URI}
/api/bill/${id}`,{
        withCredentials:true
      })
      if(response.data.success){        
        enqueueSnackbar(response.data.message,{variant:'success'})
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
    if (!match) return (      enqueueSnackbar('Enter valid Phone Number📞',{variant:'warning'}))
    try {
      console.log("submitting....")
    
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URI}
/api/bill/`, billData,{
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
        enqueueSnackbar('Order Booked Successfully',{variant:'success'})
      }
      else if (response.data === 'Invalid Token') {
        console.log('Attempting Refresh token');
        await refreshAccessToken();
        await submitData(billData)          
      }
      else {
        enqueueSnackbar('Order Booking Failed!',{variant:'error'})           
      }
    }
    catch (err) {
      enqueueSnackbar(err.message,{variant:'error'})
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