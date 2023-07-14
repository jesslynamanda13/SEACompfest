import React from 'react'
import logo from '../assets/logo-sea.png'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className = 'flex justify-between items-center h-24 text-white mx-auto'>
        <img className = "w-24" src = {logo} alt = "logo"/>
        <button
        onClick = {()=>navigate('/sign-in')}
        class="font-dmsans text-sm text-white border border-white rounded-lg px-8 py-2 transition-colors hover:bg-white hover:text-black">
            Sign In
        </button>

    </div>
  )
}

export default Navbar