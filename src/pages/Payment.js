import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { BookingContext } from "../components/context/BookingContext";
import axios from 'axios';
import { ChakraProvider, Alert, AlertIcon, CloseButton } from '@chakra-ui/react';

const Payment = () => {
  const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();
    const [selectedSeats,setSelectedSeats] = useState([]);
    const [ticket, setTicket] = useState(0);
    const [total, setTotal] = useState("");
    const [error, setError] = useState("");
    const [newBudget, setNewBudget] = useState(0);
    // const { username, userage } = useContext(BookingContext);
    const [showAlert, setShowAlert] = useState(false);

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
  
     

      const storedString = localStorage.getItem("name");
      if (storedString) {
        setName(storedString);
      }
     
      const storedAge = localStorage.getItem("age");
      if(storedAge){
        setAge(storedAge);
      }

      const bookedSeatsString = localStorage.getItem("selectedSeats");
      let bookedSeats = [];

      if (bookedSeatsString) {
        bookedSeats = JSON.parse(bookedSeatsString);
      }

      setTicket(bookedSeats.length);
    }, [ ]);

    useEffect(() => {
      const price = movie.ticket_price;
      setTotal(ticket * price);
      localStorage.setItem("total", ticket * price);
    }, [ticket, movie]);

    const handlePay = (() =>{
      const budget = parseInt(localStorage.getItem("budget"));
      if(total > budget){
        setShowAlert(true);
        setError("Current balance insufficient!");
      }else{
        const countBudget = budget - total;
        setNewBudget(countBudget);
        localStorage.setItem("budget", countBudget);

        // const fixedSeatsString = localStorage.getItem("fixedSeats");
        // const selectedSeatsString = localStorage.getItem("selectedSeats");

        // let fixedSeats = fixedSeatsString ? JSON.parse(fixedSeatsString) : [];
        // const selectedSeats = selectedSeatsString ? JSON.parse(selectedSeatsString) : [];

        // fixedSeats = [...fixedSeats, ...selectedSeats];

        // localStorage.setItem("fixedSeats", JSON.stringify(fixedSeats));
        // localStorage.setItem("selectedSeats", JSON.stringify([]));
        
        navigate('/paymentsuccess');
      }
    })
    const handleCloseAlert = () => {
      setShowAlert(false);
    };

    const handleCancel = () => {
      localStorage.setItem("name", "");
      localStorage.setItem("age", "");
      localStorage.setItem("total", "");
      localStorage.setItem("amount", "");
      localStorage.setItem("selectedSeats", "");
      navigate("/explore");
    }
  return (
    <div className = "bg-gradient-to-t from-gray-900 via-gray-900 to-black p-12 font-dmsans text-white h-screen">
      <div className = "flex flex-col items-center justify-center py-32">
        <h2 className = "text-3xl mb-4 font-bold">Billing Information</h2>
        <div className = "flex flex-row gap-12">
          <div>
            <img src = {movie.poster_url} alt = "movies" className = "w-48"/>
          </div>
          <div className = "flex flex-col">
            <p className = "text-3xl font-bold mb-4">Billed to</p>
            <p className = "text-xl mb-2">Name: {name}</p>
            <p className = "text-xl mb-2">Age: {age}</p>
            <div className='border-t border-gray-500 my-4 w-[240px]'>
          </div>
            <p className = "text-xl font-bold">Movie Title: {movie.title}</p>
            <p className = "text-xl font-bold">Selected Seats</p>
            <div className = "text-xl mr-2">
              {selectedSeats.map(item =>(
                  <p>{item}</p>
              ))}
            </div>
            <p className = "text-xl font-bold mb-4">Total: Rp. {total}</p>
            <div className = "flex flex-row gap-4">
              <button
              onClick = {handlePay} 
              className = "bg-green-300 text-green-700 font-bold text-lg rounded-lg w-32 p-2">
                Pay
              </button>
              <button 
              onClick = {handleCancel}
              className = "bg-red-300 text-red-700 font-bold text-lg rounded-lg w-48 p-2">
                Cancel order
              </button>
            </div>
          </div>

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

export default Payment