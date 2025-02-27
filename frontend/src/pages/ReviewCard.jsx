import Rating from '@mui/material/Rating';

export default function ReviewCard({ review }) {

   return (
    <figure className="bg-amber-100 rounded-xl p-8 dark:bg-slate-800 mx-auto shadow-lg md:w-[350px] w-[300px]">
      <img className="animate-spin-slow w-24 h-24 rounded-full mx-auto" src={review.imgUrl} alt="" width="384" height="512" />
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
            {review.name}
          </div>
          <div className="dark:text-white">
            {review.location}
          </div>
        </figcaption>
      </div>
    </figure>
  )
}