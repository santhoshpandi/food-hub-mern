import imgUrl from '../assets/vectors/asd.png'
import { useUser } from '../contexts/UserContext'

export default function UserProfile() {

  const { userData, setUserData, deleteUser, updateUser } = useUser()

  function confirmDelete(e) {
    e.preventDefault()
    deleteUser(userData._id)
  }

  function handleChange(event) {
    const updatedUser = {
      ...userData,
      [event.target.name]: event.target.value
    }
    setUserData(() => updatedUser)
  }


  return (
    <>
      <div className="h-screen flex md:flex-row flex-col p-5 items-center md:justify-center justify-normal gap-5 ">
        <div className='md:w-[40%] w-[90%]'>
          <img src={imgUrl} alt="Loading" className='w-full h-full mix-blend-multiply' />
        </div>
        <div className='shadow-lg bg-white p-10 rounded-lg max-w-[100%]'>
          <form onSubmit={(event) => updateUser(userData, event)} className='flex flex-col gap-2'>
            <h1 className='text-3xl font-bold text-orange-900 mb-3'>User Profile</h1>


            <label htmlFor="username" className='text-xl'>Username </label>
            <input name='username' onChange={handleChange} value={userData.username} type="text" id='username' className='px-2 focus:outline-none focus:border-none bg-orange-100' />
            <label htmlFor="password" className='text-xl'>Password </label>
            <input name='password' onChange={handleChange} value={userData.password} type="password" id='password' className='px-2 focus:outline-none focus:border-none bg-orange-100' />
            <label htmlFor="profileImage" className='text-xl'>Image </label>
            <input type="file" id='profileImage' className='px-2 focus:outline-none focus:border-none bg-orange-100' />

            <div className='flex gap-2 mt-4 w-full justify-center'>
              <button
                type='submit'
                className='bg-blue-500 px-2 py-[3px] text-white rounded-sm duration-150 hover:bg-blue-700'>Update</button>

              <button
                onClick={confirmDelete}
                className='bg-red-500 text-white px-2 py-[3px] rounded-sm duration-150 hover:bg-red-700'>Delete Account</button>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}