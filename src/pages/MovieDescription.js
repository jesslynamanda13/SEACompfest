import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDescription = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios.get('https://seleksi-sea-2023.vercel.app/api/movies')
      .then(response => {
        const movies = response.data
        const foundMovie = movies.find((movie) => movie.id === parseInt(id));

        if (foundMovie) {
            setMovie(foundMovie);
        } else {
            console.error(`Movie with ID ${id} not found.`);
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, [ ]);


  return (
    <div className='bg-gradient-to-r from-gray-800 via-gray-900 to-black h-screen'>
      <div className = "flex flex-row items-center justify-center mb-44">
        <div className = "mt-44">
            <img src = {movie.poster_url} alt = "movie" className='w-64 mr-24'/>
        </div>

        <div className = "mt-44 text-white font-dmsans">
          <p className = "text-5xl font-bold mb-2">{movie.title}</p>
          <p className= "text-opacity-50 mb-4 font-bold text-gray-400">Rated for {movie.age_rating} years and above</p>
          <p className = "text-white font-bold text-2xl mb-2">Rp. {movie.ticket_price}</p>
          <p className = "text-md text-gray-400">Description</p>
          <p className = "text-lg mb-2 font-bold w-[600px]">{movie.description}</p>
          <p className = "text-sm mb-4 text-gray-400">Released at {movie.release_date}</p>

          <Link to={`/movies/${movie.id}/booking`}>
            <button 
            className = "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline">
              Buy tickets
            </button>
          </Link>
        </div>

        
      </div>
      
    </div>
  );
};

export default MovieDescription;

