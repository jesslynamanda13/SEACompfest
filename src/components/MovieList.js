import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, ChakraProvider, Alert, AlertIcon, CloseButton } from '@chakra-ui/react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleImageClick = () => {
      setShowAlert(true);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    axios.get('https://seleksi-sea-2023.vercel.app/api/movies')
      .then(response => {
        const filteredData = response.data.filter(item => item.id >= 1 && item.id <= 2);
        setMovies(filteredData);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4">

    
        <ChakraProvider>
      <div className="grid grid-cols-4 gap-4">
        {movies.map(item => (
          <div className="font-dmsans" key={item.id}>
            <Box as="img" 
            onClick = {handleImageClick}
            className = "w-96 mt-2 w-full object-cover rounded transform transition-transform duration-200 hover:scale-105"
            src={item.poster_url}
            alt={item.title} />
            <p className="mt-2 text-lg font-semibold text-white">{item.title}</p>
            <p className= "mt-1 text-md  text-white">Age rating: {item.age_rating}</p>
          </div>
        ))}
      </div>
      {showAlert && (
        <div className="fixed bottom-4 w-[320px] right-4 z-50">
          <Alert status="warning" rounded="md">
            <AlertIcon />
            Please sign in to access this feature.
            <CloseButton position="absolute"  right="2" top="2" onClick={handleCloseAlert} />
          </Alert>
        </div>
      )}
      </ChakraProvider>

      
    </div>

    
  );
};

export default MovieList;
