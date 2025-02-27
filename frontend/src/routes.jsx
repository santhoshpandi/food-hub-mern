import { lazy } from 'react'
const Bill = lazy(()=> import('./pages/Bill'))
const Authentication = lazy(()=> import('./components/Authentication'))
const Home = lazy(()=> import('./pages/Home'))
const UserProfile = lazy(()=> import('./pages/UserProfile'))
const Checkout = lazy(()=> import('./pages/Checkout'))
import Error404 from './components/Error404'


const routes = [
  { path:'/', component:<Authentication /> ,layout:false},
  { path:'/home', component:<Home />,layout:true },
  { path:'/order', component:<Bill /> ,layout:true},
  { path:'/profile', component:<UserProfile /> ,layout:true},
  { path:'/checkout', component:<Checkout /> ,layout:true},
  { path:'*', component:<Error404 /> ,layout:false},
]

export default routes