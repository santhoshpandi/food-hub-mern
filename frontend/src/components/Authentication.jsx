import { useEffect, useState } from "react"
import Snowfall from 'react-snowfall'
import { useUser } from "../contexts/UserContext"

export default function Authentication() {

  const [slide, setSlide] = useState(false)
  const { registerUser, setUserData, userData, loginUser} = useUser()

  function slides() {
    setSlide(!slide)
  }

  function handleChange(event) {
    const newUser = {
      ...userData,
      [event.target.name]: event.target.value
    }
    setUserData(() => newUser)

  }

  return (
    <>
      <div className="body bg-gradient-to-r from-slate-100 to-orange-100 h-screen
    flex justify-center items-center">
        <Snowfall color='#e76f51' snowflakeCount={30} />
        <div className="ctr flex flex-wrap flex-col md:flex-row relative">
          {/* ----------------- SignUp ----------------- */}

          <div className="signup flex-grow flex items-center justify-center">
            <form onSubmit={(event) => registerUser(userData, event)} className="signupform ">
              <h1 className="text-[30px] text-orange-700 font-bold">Sign UP</h1>
              <input classname='' onChange={handleChange} type="text" name="username" id="username" placeholder="Username" required />
              <input classname='' onChange={handleChange} type="password" name="password" id="password" placeholder="Password" required />
              <button className="bg-orange-800  text-white md:max-w-[100px] p-[5px] rounded-sm">SIGN UP</button>
            </form>
          </div>

          {/* ----------------- SingIn ----------------- */}

          <div className="signup flex-grow flex items-center justify-center">
            <form onSubmit={(event) => loginUser(userData, event)} className="signupform">
              <h1 className="text-[30px] text-orange-700 font-bold">Sign in</h1>
              <input classname='' onChange={handleChange} type="text" name="username" id="usernames" placeholder="Username" required />
              <input classname='' onChange={handleChange} type="password" name="password" id="passwords" placeholder="Password" required />
              <button className="bg-orange-800 text-white md:max-w-[100px] p-[5px] rounded-sm">SIGN IN</button>
            </form>
          </div>

          {/* ----------------- Wrapper ----------------- */}
          <div className={`absolute md:w-1/2 md:h-full w-full h-1/2 bg-[#e76f51] left-0 top-0 bottom-0 right-0  flex justify-center items-center text-white toggle duration-150 flex-col md:flex-row
        ${slide ? 'translate-y-[100%] md:translate-y-0 md:translate-x-[100%] md:rounded-l-[40px] rounded-t-[40px] md:rounded-tr-none' : 'md:rounded-r-[40px] rounded-b-[40px] md:rounded-bl-none'}
        `}>

            {
              slide
                ?
                <div className=" toggle-left text-xl flex flex-col gap-4 p-5">
                  <h1 className="text-[30px]">Welcome Back!</h1>
                  <p>Enter your personal details to use all of site features</p>
                  <button
                    onClick={slides}
                    className="text-white text-sm border hover:bg-black duration-150 border-white rounded-sm px-2 py-1 flex-grow-0" id="login">Sign In</button>
                </div>

                :

                <div className=" toggle-right text-xl flex flex-col gap-4 p-5">
                  <h1 className="text-[30px]">Hello, Friend!</h1>
                  <p>Register with your personal details to use all of site features</p>
                  <button
                    onClick={slides}
                    className="text-white text-sm border border-white rounded-sm px-2 py-1 hover:bg-black duration-150 flex-grow-0" id="login">Sign Up</button>
                </div>

            }

          </div>
        </div>
      </div>

    </>
  )
}