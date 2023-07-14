import React, { createContext, useState } from "react";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
    const [username, setName] = useState("");
    const [userage, setAge] = useState("");
    const [title, setTitle] = useState("");
    const [total, setTotal] = useState(0);
    const [seats, setSeats] = useState([]);
  
    const updateUser = (newName, newAge, newTitle, newTotal, newSeats) => {
      setName(newName);
      setAge(newAge);
      setTitle(newTitle);
      setTotal(newTotal);
      setSeats(newSeats);
    };
  
    const bookingContextValue = {
      username,
      userage,
      title,
      total,
      seats,
      updateUser,
    };
    
  return (
    <BookingContext.Provider value={bookingContextValue}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
export { BookingContext };
