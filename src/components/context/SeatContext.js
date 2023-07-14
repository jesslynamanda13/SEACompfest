import React, { createContext, useState, useEffect } from "react";

const SeatContext = createContext();

const SeatProvider = ({ children }) => {
  const initialSeats = [
    "A2", "A4", "B6", "B8", "C4", "C5", "C6", "G2", "G3", "G4", "G5", "G6"
  ];
  const [seats, setSeats] = useState(initialSeats);

  useEffect(() => {
    const storedSeats = localStorage.getItem("seats");
    if (storedSeats) {
      setSeats(JSON.parse(storedSeats));
    } else {
      setSeats(initialSeats);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("seats", JSON.stringify(seats));
  }, [seats]);

  const updateSeats = (newSeats) => {
    setSeats(newSeats);
  };

  const seatContextValue = {
    seats,
    updateSeats
  };

  return (
    <SeatContext.Provider value={seatContextValue}>
      {children}
    </SeatContext.Provider>
  );
};

export { SeatContext, SeatProvider };
