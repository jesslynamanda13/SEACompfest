import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://seleksi-sea-2023.vercel.app/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);
  return (
    <MovieContext.Provider value={movies}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
