import './App.css';
import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
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
          <Route path = "/budget" element = { <Budget/>}/>
          <Route path ="/budget-topup" element = {<Topup/>}/>
          <Route path = "/budget-withdraw" element = {<Withdraw/>}/>
          <Route path = "/explore" element = {<ProtectedRoute><Explore/></ProtectedRoute>}/>
          <Route path="/movies/:id/description" element = {<MovieDescription/>}/>
          <Route path = "/movies/:id/booking" element = {<BookingForm/>}/> 
          <Route path = "/movies/:id/form" element = {<UserPaymentForm/>}/> 
          <Route path = "/log-out" element = {<LogoutBtn />}/> 
          <Route path = "/movies/:id/payment" element = {<Payment/>}/>
          <Route path = "/paymentsuccess" element = {<PaymentSuccess/>}/>

          
           {/* <Route path="/movies-:id/booking" element = {<BookingForm />}/>  */}
      </Routes>
    </div>
  );
}

export default App;
