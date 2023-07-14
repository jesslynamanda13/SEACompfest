import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';
import Budget from './pages/Budget';
import Topup from './pages/Topup';
import Withdraw from './pages/Withdraw';
import BookingForm from './pages/BookingForm';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutBtn from './components/LogoutBtn';
import MovieDescription from './pages/MovieDescription';
import UserPaymentForm from './pages/UserPaymentForm';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/sign-in" element={ <SignIn/> } />
          <Route path="/sign-up" element={ <SignUp/> } />
          <Route path = "/budget" element = {<ProtectedRoute><Budget/></ProtectedRoute>}/>
          <Route path ="/budget-topup" element = {<ProtectedRoute><Topup/></ProtectedRoute>}/>
          <Route path = "/budget-withdraw" element = {<ProtectedRoute><Withdraw/></ProtectedRoute>}/>
          <Route path = "/explore" element = {<ProtectedRoute><Explore/></ProtectedRoute>}/>
          <Route path="/movies/:id/description" element = {<ProtectedRoute><MovieDescription/></ProtectedRoute>}/>
          <Route path = "/movies/:id/booking" element = {<ProtectedRoute><BookingForm/></ProtectedRoute>}/> 
          <Route path = "/movies/:id/form" element = {<ProtectedRoute><UserPaymentForm/></ProtectedRoute>}/> 
          <Route path = "/movies/:id/payment" element = {<ProtectedRoute><Payment/></ProtectedRoute>}/>
          <Route path = "/paymentsuccess" element = {<ProtectedRoute><PaymentSuccess/></ProtectedRoute>}/>

      </Routes>
    </div>
  );
}

export default App;
