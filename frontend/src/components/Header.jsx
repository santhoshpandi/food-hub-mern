import { useState } from "react"


import logoUrl from '../assets/logo.png'
import imgUrl from '../assets/profile_images/image-1.jpg'
import { Link } from "react-router"
import { useUser } from "../contexts/UserContext"

export default function Header() {

  const [openNav, setOpenNav] = useState(false)
  const { logoutUser } = useUser()


  return (
    <div className="bg-orange-300 flex flex-wrap md:flex-row flex-col md:gap-0 gap-2 justify-between items-center p-3  sticky top-0 left-0 right-0 z-[10]">
      <span className="text-2xl font-bold flex gap-2 items-center justify-center">
        <img className="bg-blend-lighten" src={logoUrl} width={50} height={50} alt="Logo" />
        FoodHub
      </span>
      <div className="flex ">
        <ul className="flex  md:flex-row px-2 py-[5px] gap-5 ">
        <li className="cursor-pointer font-semibold md:hover:text-red-900 duration-150 md:bg-transparent bg-orange-900 px-2 py-1 md:text-black text-white rounded-md">
            <Link to='/home'>
              Home
            </Link>
          </li>
          <li className="cursor-pointer font-semibold md:hover:text-red-900 duration-150 md:bg-transparent bg-orange-900 px-2 py-1 md:text-black text-white rounded-md">
            <Link to='/order'>
              Serve
            </Link>
          </li>
          <li className="cursor-pointer font-semibold md:hover:text-red-900 duration-150 md:bg-transparent bg-orange-900 px-2 py-1 md:text-black  text-white rounded-md">
            <Link to='/checkout'>
              Orders
            </Link>
          </li>
        </ul>
        <div
          onClick={() => setOpenNav(!openNav)}
          className="rounded-full md:w-[35px] w-[40px] cursor-pointer ml-[15px]">
          <img src={imgUrl} className="rounded-full" alt="" />
        </div>
      </div>

      {
        openNav ?
          <>
            <div
              onClick={() => setOpenNav(!openNav)}
              className="overlay">
            </div>
            <div className="w-[180px]  absolute right-0 top-full z-[10]">
              <ul className="">
                <Link to='/profile'>
                  <li className="px-2 bg-[#e76f51] text-white border border-slate-200 py-[5px] cursor-pointer duration-150 hover:bg-slate-950 "
                    onClick={() => setOpenNav(!openNav)}
                  >User Profile</li>
                </Link>
                <li
                  onClick={logoutUser}
                  className="px-2 bg-[#e76f51] text-white border border-slate-200 py-[5px] cursor-pointer duration-150 hover:bg-slate-950 ">Logout</li>
              </ul>
            </div>
          </> :
          <></>
      }

    </div>
  )
}