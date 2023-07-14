import React, {useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookingContext } from "../components/context/BookingContext";
import axios from 'axios';
import { Box, Button, ChakraProvider, Alert, AlertIcon, CloseButton } from '@chakra-ui/react';

const UserPaymentForm = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [agert, setAgert] = useState(0);
    const navigate = useNavigate();
    const [selectedSeats,setSelectedSeats] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [ticket, setTicket] = useState(0);
    const [total, setTotal] = useState("");
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const { username, userage, updateUser } = useContext(BookingContext);

    useEffect(() => {
      axios.get('https://seleksi-sea-2023.vercel.app/api/movies')
        .then(response => {
          const movies = response.data
          const foundMovie = movies.find((movie) => movie.id === parseInt(id));
  
          if (foundMovie) {
              setMovie(foundMovie);
              setAgert(movie.age_rating);

          } else {
              console.error(`Movie with ID ${id} not found.`);
          }
        })
        .catch(error => {
          console.error('Error fetching movies:', error);
        });
    }, [ ]);

    

    const handleSubmit = (e) => {
      e.preventDefault();
      const agert = movie.age_rating
      if(age < agert){
        setShowAlert(true);
        setError(`Age should be at least ${agert}`)
      }else{
        navigate(`/movies/${movie.id}/payment`);
        localStorage.setItem("name", name);
        localStorage.setItem("age", age);
        updateUser(name, age);
  
        const bookedSeatsString = localStorage.getItem("selectedSeats");
        let bookedSeats = [];
  
        if (bookedSeatsString) {
          bookedSeats = JSON.parse(bookedSeatsString);
        }
        setTicket(bookedSeats.length);
        setSelectedSeats(bookedSeats);
        const price = movie.ticket_price;
        setTotal(ticket*price);
        localStorage.setItem("amount", ticket);
        localStorage.setItem("total", total);
  
        setName("");
        setAge("");
      }
    };
    
    
    const handleCloseAlert = () => {
      setShowAlert(false);
    };
    const totalToDisplay = localStorage.getItem("total");
    const ticketToDisplay = localStorage.getItem("amount");
  
  return (
    <div className = "bg-gradient-to-t from-gray-900 via-gray-900 to-black p-12 font-dmsans h-screen text-white">
      <div className = "flex flex-row p-24">
        <div className = "flex flex-col">
          <p className = "font-bold text-3xl">User Payment Form</p>
          <p className = " text-lg mt-2">Fill in your information before continuing to payment.</p>
          <form onSubmit={handleSubmit} className='mt-12 flex flex-col'>
            <label className = "font-bold text-lg">
              Name:
            </label>
            <input
                placeholder = "Amanda"
                type="text"
                className = "w-72 mt-2 mb-2 shadow appearance-none border rounded-lg w-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label className='font-bold text-lg'>
              Age:
            </label>
            <input
                type="number"
                placeholder = "19"
                className = "w-72 mt-2 shadow appearance-none border rounded-lg w-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onClick={(e) => setAge(e.target.value)}
            />
            <p className='mt-2'>Enter to submit!</p>
            <button 
            className="w-64 mt-8 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            type="submit">
              Continue to Payment
            </button>
          </form>
        </div>

       
      <ChakraProvider>
        {showAlert && (
            <div className="fixed bottom-4 right-4 w-[320px] z-50 text-black">
            <Alert status="warning" rounded="md">
                <AlertIcon />
                {error}
                <CloseButton position="absolute"  right="2" top="2" onClick={handleCloseAlert} />
            </Alert>
            </div>
        )}
      </ChakraProvider>
      </div>
    </div>
  )
}

export default UserPaymentForm