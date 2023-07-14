import React, {useEffect} from 'react'
import {useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/explore');
    }

    useEffect(() => {
        const fixedSeatsString = localStorage.getItem("fixedSeats");
        const selectedSeatsString = localStorage.getItem("selectedSeats");
      
        let fixedSeats = fixedSeatsString ? JSON.parse(fixedSeatsString) : [];
        const selectedSeats = selectedSeatsString ? JSON.parse(selectedSeatsString) : [];
      
        fixedSeats = [...fixedSeats, ...selectedSeats];
      
        localStorage.setItem("fixedSeats", JSON.stringify(fixedSeats));
        localStorage.setItem("selectedSeats", JSON.stringify([]));
      }, []);
      
  return (
    <div className = "bg-gradient-to-t from-gray-900 via-gray-900 to-black p-12 font-dmsans text-white h-screen">
        <div className = "flex flex-col justify-center items-center p-64">
            <p className = "font-bold text-3xl mb-4">Payment Success!</p>
            <button
            onClick = {handleClick} 
            className = "bg-green-300 text-green-700 font-bold text-lg rounded-lg w-64 p-2">
            Return to Home</button>
        </div>
    </div>
  )
}

export default PaymentSuccess