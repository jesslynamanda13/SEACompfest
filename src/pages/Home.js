import React from 'react'
import '../App.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieList from '../components/MovieList';



const Home = () => {
  
  return (
    <div className = "bg-gradient-to-t from-gray-700 via-gray-900 to-black p-8">
        <Navbar/>
        <Hero />
        <MovieList/>
    </div>
  )
}

export default Home