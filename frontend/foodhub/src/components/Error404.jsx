import imageUrl from '../assets/vectors/image404.webp'
import { Link } from 'react-router'
import Snowfall from 'react-snowfall'
export default function Error404(){
  return(
    <div className='flex justify-center items-center h-screen flex-col'>
      <Snowfall color='#e76f51' snowflakeCount={30} />
      <img src={imageUrl} alt="" />
      <Link to='/home'>
        <span className='underline text-orange-900 text-xl'>Back to Home</span>
      </Link>
    </div>
  )
}