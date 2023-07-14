import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserAuthContextProvider } from './components/context/UserAuthContext';
import MovieProvider from './components/context/MovieContext';
import { BudgetProvider } from './components/context/BudgetContext';
import BookingProvider from './components/context/BookingContext';
import { SeatProvider } from './components/context/SeatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserAuthContextProvider>
      <BookingProvider>
        <SeatProvider>
          <BudgetProvider>
            <MovieProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </MovieProvider>
          </BudgetProvider>
        </SeatProvider>
      </BookingProvider>
   </UserAuthContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
