import React from 'react'
import {useNavigate} from "react-router-dom"
import arrow from '../assets/arrow.png'

const Hero = () => {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/sign-in');
    }
  return (
    <div className='hero'>
        <div className = 'mt-8 text-white text-4xl font-bold font-dmsans flex flex-col items-center gap-2'>
            <p>No more queuing, less worrying.</p>
            <p>All of our <span className = "bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text" >curated movies</span> are reserved for you.</p>
        </div>
        <div className = "text-header flex text-center">
            <p className = "text-white px-64 mt-4 text-md w-108 font-dmsans">Experience SEA Cinema - the revolutionary movie theater with effortless ticket booking. Browse movies, select showtimes, choose seats, and secure reservations in seconds. Enjoy hassle-free transactions using our user balance feature. Get ready for a brilliant moviegoing journey with no more queues.</p>
        </div>

        <div className = "flex justify-center items-center mt-6">
            <button class="font-dmsans flex flex-row items-center gap-4">
                <p 
                onClick = {handleClick}
                className = "text-lg font-bold text-white">Start by signing in </p>
                <img src = {arrow} alt = "arrow" className = "w-2"/>
            </button>
        </div>

        <div className="px-12 mt-12 mb-4 flex flex-col text-white gap-4 font-dmsans">
            <p className = "text-4xl font-bold">Trending Now ❤️‍🔥</p>
            <p className = "text-md ">Don't miss out on our trending movies!</p>
        </div>
    </div>
  )
}

export default Hero