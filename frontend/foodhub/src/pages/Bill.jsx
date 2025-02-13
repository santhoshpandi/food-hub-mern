import imgUrl from '../assets/vectors/bill_image.jpg'
import { useBill } from '../contexts/BillContext'

export default function Bill() {

  const {billData,setBillData,submitData} = useBill()
  function handleChange(event){

    setBillData((prev)=>(
      {
        ...prev,
        [event.target.name]:event.target.value
      }
    ))
  }

  //Submit Function
  function sendData(e) {
    e.preventDefault()
    const datedBillData = {...billData,date:new Date().toISOString()}
    setBillData(datedBillData)
    submitData(datedBillData)
    billData.name=''
  }

  return (
    <>
    <div className='bills   flex flex-wrap items-center justify-center gap-5  mb-20'>
      <div className='md:w-[40%] w-[80%]'>
        <img src={imgUrl} alt="Loading" className='w-full h-full mix-blend-multiply' />
      </div>
      <form onSubmit={sendData} className=' grid grid-cols-2 p-5 gap-3 rounded-sm bg-orange-200'>
        <h1
          className='text-[25px] col-span-2 text-center mb-2 text-orange-950 font-semibold'>
          Food Bill
        </h1>

        <label className='text-[18px]' htmlFor="name">Name</label>
        <input
        onChange={handleChange}
        value={billData.name}
        className='rounded-sm focuss '
          type="text" name="name" id="name" required />
        <label className='text-[18px]' htmlFor="mobile">Mobile</label>
        <input
        onChange={handleChange}
        value={billData.mobile}
        className='rounded-sm focuss'
          type="number" name="mobile" id="mobile" required />
        <label className='text-[18px]' htmlFor="foodItems">Food Items</label>

        <select 
        onChange={handleChange}
        value={billData.foodItems}
        name="foodItems" id="foodItems" className="cursor-pointer foodItems  focuss" required>
          <option value=''>Select Menu</option>
          <option value="Veg-Combo" className="">Veg Combo-Rs.199</option>
          <option value="Mutton-Combo" className="">Mutton Combo-Rs.499</option>
          <option value="Chicken-Combo" className="">Chicken Combo-Rs.399</option>
          <option value="Beef-Combo" className="">Beef Combo-Rs.299</option>
        </select>

        <label className='text-[18px]' htmlFor="quantity">Quantity</label>

        <select 
        onChange={handleChange}
        value={billData.quantity}
        name="quantity" id="quantity" className="cursor-pointer quantity focuss" required>
          <option value=''>Quantity</option>
          <option value="1" className="">1</option>
          <option value="2" className="">2</option>
          <option value="3" className="">3</option>
          <option value="4" className="">4</option>
        </select>

        <button className="col-span-2 bg-blue-500 text-white py-2 rounded-sm duration-150 hover:bg-slate-900">Proceed to Payment</button>
      </form>
    </div>
    </>
  )
}
