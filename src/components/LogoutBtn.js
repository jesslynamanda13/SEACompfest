import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from './context/UserAuthContext';


const LogoutBtn = () => {
    const{ user, logOut} = useUserAuth();
    const navigate = useNavigate();

    const handleLogout = async()=>{
        try{
            await logOut();
            navigate('/')
        }catch(error){
            console.log(error)
        }
    }
    console.log(user.email)
  return (
    <div>
        <button onClick = {handleLogout}  className = "ml-4 border rounded-full p-2 px-4 font-dmsans text-white">
            Log out
        </button>
    </div>
  )
}

export default LogoutBtn