import React,  { useEffect, useState, useContext }from 'react'
import logo from "../assets/logo-sea.png"
import { useNavigate } from 'react-router-dom';
import { BudgetContext } from '../components/context/BudgetContext';
import { useUserAuth } from './context/UserAuthContext';
import LogoutBtn from './LogoutBtn';


const NavbarLogin = () => {
  const navigate = useNavigate();
  const {user, logOut} = useUserAuth();
  const [storedValue, setStoredValue] = useState('');
  const [balance, setBalance] = useContext(BudgetContext);

  useEffect(() => {
    const value = localStorage.getItem('email');
    setStoredValue(value);
  }, []); 

    const handleLogout = async()=>{
        try{
            await logOut();
            navigate('/')
        }catch(error){
            console.log(error)
        }
    }

    const navigateExplore = () =>{
      navigate("/explore");
    }
  const storedBalance = localStorage.getItem('budget');

  return (
    <div>
      <div className = " text-white font-dmsans flex justify-between mx-auto items-center relative">
          <img 
          onClick = {navigateExplore}
          src = {logo} alt = "logo" className = "w-24"/>

          <div className = "right flex flex-row">
            <button 
            onClick = {()=>navigate('/budget')}
            className = "text-black font-bold rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2">
              Balance: Rp. {storedBalance}
            </button>
            <button className = "ml-4 border rounded-full p-2 px-4">
              {user.email}
            </button>
            <button onClick = {handleLogout}  className = "ml-4 border rounded-full p-2 px-4 font-dmsans text-white">
                Log out
            </button>
            
          </div>
        </div>
    </div>
  )
}

export default NavbarLogin
