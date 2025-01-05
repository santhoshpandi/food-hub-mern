import { useState } from "react"


import imgUrl from '../assets/profile_images/image-1.jpg'
import { Link } from "react-router"
import { useUser } from "../contexts/UserContext"
export default function Header() {

  const [openNav, setOpenNav] = useState(false)
  const { logoutUser } = useUser()


  return (
    <div className="bg-orange-300 flex flex-wrap justify-between items-center p-3  sticky top-0 left-0 right-0 z-[10]">
      <span className="text-xl">
        Familos
      </span>
      <div className="flex">
        <ul className="flex  md:flex-row px-2 py-[5px] gap-5">
        <li className="cursor-pointer hover:font-semibold duration-150">
            <Link to='/home'>
              Home
            </Link>
          </li>
          <li className="cursor-pointer hover:font-semibold duration-150">
            <Link to='/about'>
              About
            </Link>
          </li>
          <li className="cursor-pointer hover:font-semibold duration-150">
            <Link to='/checkout'>
              Orders
            </Link>
          </li>
        </ul>
        <div
          onClick={() => setOpenNav(!openNav)}
          className="border border-black rounded-full w-[35px] cursor-pointer ml-[15px]">
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