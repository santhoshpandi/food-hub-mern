import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios'

export default function ReviewCard({ review }) {

  const [imgUrl, setImgUrl] = useState()
  const [name, setName] = useState()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    async function getImage() {
      await axios.get('https://randomuser.me/api/')
        .then(res => {
          //Random image
          setImgUrl(() => res.data.results[0].picture.medium)

          //Random name
          const { first, last } = res.data.results[0].name
          setName(() => first + " " + last)
        })
        .catch(err => {
          // enqueueSnackbar(err.message, { variant: 'error' })
          console.log(err.message)
        })
    }
    getImage()
  }, [])

  return (
    <figure className="bg-amber-100 rounded-xl p-8 dark:bg-slate-800 mx-auto shadow-lg md:w-[350px] w-[300px]">
      <img className="animate-spin-slow w-24 h-24 rounded-full mx-auto" src={imgUrl} alt="" width="384" height="512" />
      <div className="pt-6 space-y-4">
        <center>
          <Rating name="read-only" value={review.rating} readOnly />
        </center>
        <blockquote>
          <p className="text-lg text-slate-800 font-medium dark:text-white">
            “{review.review}”
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-[brown] font-semibold dark:text-sky-400">
            {name}
          </div>
          <div className="dark:text-white">
            {review.location}
          </div>
        </figcaption>
      </div>
    </figure>
  )
}