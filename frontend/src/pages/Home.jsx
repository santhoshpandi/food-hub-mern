import imgUrl from '../assets/vectors/food.png'
import { FaLongArrowAltRight } from "react-icons/fa";

import ReviewCard from './ReviewCard';
import reviews from '../data/reviews.json'

import {useNavigate} from 'react-router'
import {useInView} from 'react-intersection-observer'
import { useState } from 'react';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {

  const [isVisible, setIsVisible] = useState()
  const {ref, inView} = useInView({
    triggerOnce: true, 
    onChange: (inView) => setIsVisible(inView), 
    threshold: 0.5 
  })

  const navigate = useNavigate()

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 866,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div className='bg-orange-100'>

      {/* ---------------- Welcome Section ---------------- */}
      <div ref={ref} className={`flex flex-wrap md:flex-row h-[90vh] flex-col`}>
        {/* ---------------- Left Welcome Message Part ---------------- */}
        <div className={`md:w-[40%] flex items-center justify-center p-6 transform transition-transform duration-700 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>          
          <div className='md:block flex flex-col items-center'>
            <span className='text-[40px] text-orange-900 font-semibold'>Welcome to Food Hub</span>
            <p className='text-[23px]'>
              Taste the richness of authentic cuisine delivered fresh to your Happiness.
            </p>
            <button onClick={()=>navigate('/order')} className='px-2 py-1 bg-amber-950 text-white rounded-md w-[300px] text-[25px] hover:bg-opacity-90 duration-150 mt-4'>
              Explore Menu <FaLongArrowAltRight className='inline text-[50px]' />
            </button>
          </div>
        </div>
        {/* ---------------- Right Image Part ---------------- */}
        <div className={`bg-black backdrop-blur-md bg-opacity-70 md:w-[60%] flex justify-center items-center rounded-l-full transform transition-transform duration-700 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
          <img className='scale-[1.05] animate-rotate-slow' src={imgUrl} alt="Infinity" />
        </div>
      </div>

      {/* ---------------- Reviews Section ---------------- */}
      <div className="p-5">
        <h2 className='text-center text-[35px] text-orange-800 font-semibold mb-8'>Reviews</h2>
        <div className='m-auto w-[95%] p-4 px-5 bg-zinc-900 rounded-lg shadow-2xl items-center'>
          <Slider {...settings} >
            {
              reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))
            }
          </Slider>
        </div>
      </div>
    </div>
  )
}