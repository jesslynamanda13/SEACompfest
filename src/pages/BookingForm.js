import React, {useState} from 'react'
import MovieSeat from '../components/MovieSeat';

const BookingForm = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = seatNumber => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  return (
    <div className = "bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <MovieSeat/>
    </div>
    
 
  )
}

export default BookingForm