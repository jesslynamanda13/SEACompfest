import React, {useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import screen from '../assets/screen.png';
import { SeatContext } from "../components/context/SeatContext";
import { Box, Button, ChakraProvider, Alert, AlertIcon, CloseButton } from '@chakra-ui/react';

const MovieSeat = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const { seats, updateSeats } = useContext(SeatContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
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
  }, [ ]);

  const componentArray = Array.from({ length: 64 }, (_, index) => index);
  const getCheckboxLabel = (index) => {
    const row = String.fromCharCode(65 + Math.floor(index / 8)); 
    const col = (index % 8) + 1;
    return `${row}${col}`;
  };
  // const [fixedSeats, setFixedSeats] = useState([
  //   'A2', 'A4', 'B6', 'B8', 'C4', 'C5', 'C6', 'G2', 'G3', 'G4', 'G5', 'G6']);
  const [selectedSeats, setSelectedSeats] = useState('')
  const [selectedSeatslen, setSelectedSeatslen] = useState(0);
  const [confirmedSeats, setConfirmedSeats] = useState([]);

  // useEffect(() => {
  //   const storedSeats = localStorage.getItem('selectedSeats');
  //   if (storedSeats) {
  //     setSelectedSeats(JSON.parse(storedSeats));
  //   }

  //   localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  //   localStorage.setItem('fixedSeats', JSON.stringify(fixedSeats));
  //   if(confirmedSeats.len === 0){
  //     setSelectedSeatslen(0);
  //   }
  // }, []);
  
  useEffect(() =>{
    const fixedSeatsString = localStorage.getItem('fixedSeats');
    let fixedSeatsToStore = [];
  
    if (fixedSeatsString) {
      fixedSeatsToStore = JSON.parse(fixedSeatsString);
    }
  
    if (Array.isArray(selectedSeats) && selectedSeats.length > 0) {
      fixedSeatsToStore.push(...selectedSeats);
    }
  
    const updatedFixedSeatsString = JSON.stringify(fixedSeatsToStore);
    localStorage.setItem('fixedSeats', updatedFixedSeatsString);
    updateSeats(fixedSeatsToStore);
  })
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  
  const handleCheckboxChange = (event) => {
    const { checked, id } = event.target;
  
    if (checked) {
      setConfirmedSeats((prevConfirmSeats) => [...prevConfirmSeats, id]);
      setSelectedSeatslen(confirmedSeats.length + 1);
    } else{
      setConfirmedSeats((prevConfirmSeats) =>
        prevConfirmSeats.filter((seat) => seat !== id)
      );
      setSelectedSeatslen(confirmedSeats.length - 1);
    }
    
  };
  
  const handleConfirm = () => {
    if(confirmedSeats.length <= 0 || confirmedSeats.length > 6){
      setShowAlert(true);
      setError("Please select tickets, not more than 6")
    }else{
      setSelectedSeats(confirmedSeats);
      localStorage.setItem('selectedSeats', JSON.stringify(confirmedSeats));
      const movieId = movie.id;
      navigate(`/movies/${movieId}/form`)
    }
  };

  const fixedSeatsToDisplay = localStorage.getItem("fixedSeats");
  const fixedSeatsToArray = fixedSeatsToDisplay ? JSON.parse(fixedSeatsToDisplay) : [];

  const isSeatSelected = (id) => fixedSeatsToArray.includes(id);


  return (
    <div className = "flex flex-row">
      <div className="flex flex-col mt-24 ml-24 justify-center items-center">
        <img src={screen} alt="screen" className="w-96" />
        <p className='font-dmsans text-sm text-white'>Screen</p>
        <div className = "mt-4 flex flex-row gap-2">
          <input
            className="rounded-md focus:ring-0 h-6 w-6 border-none bg-gray-300"
            type="checkbox"
            disabled
          />
          <p className='font-dmsans text-md text-white'>Booked</p>

          <input
            className="ml-4 rounded-md focus:ring-0 h-6 w-6 border-none bg-green-100"
            type="checkbox"
            disabled
          />
          <p className='font-dmsans text-md text-white'>Available</p>
          
        </div>
        <div className="mt-4 grid grid-cols-8 w-96">
          {componentArray.map((item) => {
            const label = getCheckboxLabel(item);
            const checkboxId = `${label}`;
            const isChecked = isSeatSelected(checkboxId);
            const checkboxClassName = isChecked
              ? 'red-checkbox'
              : 'default-checkbox';
            const isDisabled = isChecked;

            return (
              <div className="m-2 flex flex-col justify-center" key={item}>
                <input
                  className={`appearance-none  rounded-md  focus:ring-0 h-8 w-8 ${
                    checkboxClassName === 'red-checkbox' ? 'border-none bg-gray-300' : 'border-green-300 bg-green-100 text-green-500'
                  }`}
                  type="checkbox"
                  id={label}
                  onChange={handleCheckboxChange}
                  disabled={isDisabled}
                />
                <label
                  className="mt-2 text-white font-dmsans text-sm"
                  htmlFor={label}
                >
                  {label}
                </label>
              </div>
            );
          })}
         
        </div>
        
      </div>
      <div className = "mt-24 ml-24 font-bold text-white font-dmsans">
        <p className="mt-2 text-3xl">
            Selected Seats:
        </p>
        <p className = "text-lg text-red-400 mb-2">Rp. {movie.ticket_price}/ticket</p>
        <div className='flex flex-row gap-2 mt-2 text-xl'>
          {confirmedSeats.map((item, index) =>(
              <p key = {index}>{item}</p>
            ))}
        </div>
        {/* <p className="mt-2 text-lg font-bold text-green-500 font-dmsans bg-green-50 w-24 rounded-lg flex justify-center items-center p-2">
          {selectedSeatslen} tickets
        </p> */}

        <button 
        className="mt-8 px-4 py-2 font-dmsans bg-green-500 text-white rounded-md" onClick={handleConfirm}>
            Confirm and Continue
        </button>

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
  );
};

export default MovieSeat;

