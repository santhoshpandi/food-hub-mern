import { useEffect } from "react"
import { useBill } from "../contexts/BillContext"

export default function Checkout() {
  const { bills,deleteBillData } = useBill()

  return (
    <div className="grid  lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 p-4">
    {
      bills.length!==0 ?
      bills.map((bill,index)=>(
        <div key={index} className="border bg-orange-200 py-2 px-3  rounded-md flex flex-col  gap-2">
          <span className="px-1 overflow-hidden" >Bill id:  {bill._id}</span> 
          <span className="px-1" >Date:  {bill.date}</span> 
          <span className="px-1" >Item:  {bill.foodItems}</span> 
          <span className="px-1" >quantity:  {bill.quantity}</span> 
          <span className="px-1" >Name:  {bill.name}</span> 
          <span className="px-1" >Mobile:  {bill.mobile}</span> 
          <div  className="bg-white 
           rounded-sm px-1">
            Total Amount  <br />
            <span className="font-xl font-semibold">{bill.totalAmount}</span>
          </div> 
          <button onClick={()=>deleteBillData(bill._id)}>Delete</button>
          
        </div>

      ))

      : <div>
        Order Empty
      </div>
    }
    </div>
  )
}