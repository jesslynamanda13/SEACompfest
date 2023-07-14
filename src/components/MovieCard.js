import React from 'react'

const MovieCard = (movie) => {
  return (
    <div className="font-dmsans" key={movie.id}>
        <img className = "w-96 mt-2 w-full object-cover rounded transform transition-transform duration-200 hover:scale-105"src={movie.poster_url} alt={movie.title} />
        <p className="mt-4 text-xl font-semibold text-white">{movie.title}</p>
    </div>
  )
}

export default MovieCard