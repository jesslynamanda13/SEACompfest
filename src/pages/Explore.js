import React from 'react'
import NavbarLogin from '../components/NavbarLogin';
import HotThisWeek from '../components/HotThisWeek';
import video from '../assets/trailer.mp4';
import MovieAllList from '../components/MovieAllList';
import LogoutBtn from '../components/LogoutBtn.js';

const Explore = () => {
  return (
    <div>
      <video className="absolute inset-0 w-full h-auto object-cover" src={video} autoPlay muted loop />
       <div className='bg-gradient-to-t from-gray-700 via-gray-900 to-black p-8'>
        <NavbarLogin/>
        <LogoutBtn/>
        <HotThisWeek/>
        <MovieAllList/>
        
       </div>
    </div>
  )
}

export default Explore