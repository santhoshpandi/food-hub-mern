import imgUrl from '../assets/vectors/loader_gif.gif'
import {preload} from 'react-dom'
export default function Loading(){

  

  return(
    <div className='flex justify-center items-center h-screen'>
      <img src={imgUrl} 
      alt="Loading..." 
      className='mix-blend-multiply'
      />
    </div>
  )
}