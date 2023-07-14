import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../assets/logo-sea.png";
import moviesimg from "../assets/movies-login.jpg";
import { useUserAuth } from '../components/context/UserAuthContext';
import { ChakraProvider, Alert, AlertIcon, CloseButton } from '@chakra-ui/react';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../config';
import { sendPasswordResetEmail } from 'firebase/auth';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const {user, signUp} = useUserAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate(); 
  const docRef = collection(db, 'users');

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        try{
          await signUp(email, password);
          navigate('/sign-in');
          await docRef.addDoc({
            email: email,
            password: password
          });
        }catch(err){
          setError(err.message)
          setShowAlert(true)
        }
  };

  return (
    <div>
    
        <div className="flex flex-row">
            <div className="w-1/2 h-screen md:none">
              <img
                className="object-cover h-full w-full"
                src={moviesimg}
                alt="login-movies"
              />
            </div>

            <div className="w-1/2 h-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-black">
              <form onSubmit = {handleSubmit}>
                <div className="text-white p-40 flex flex-col font-dmsans">
                  <img src={logo} alt="logo" className="w-20" />
                  <p className="mt-8 font-dmsans text-2xl font-semibold">
                    Welcome!
                  </p>
                  <p className="mt-2 font-md">
                    Already have an account yet!{" "}
                    <Link to="/sign-in" className="font-bold underline">
                      Sign in here
                    </Link>
                  </p>

                  <label
                    class="mt-8 font-dmsans block text-white text-lg font-bold mb-2"
                    for="username">
                    Email
                  </label>
                  <input
                    type="email"
                    class="mt-2 shadow appearance-none border rounded-lg w-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="email@gmail.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <label
                    class="mt-4 font-dmsans block text-white text-lg font-bold mb-2"
                    for="password">
                    Password
                  </label>
                  <input
                    className="font-dmsans"
                    type="password"
                    class="mt-2 shadow appearance-none border rounded-lg w-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="********"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div class="flex items-center justify-between">
                    <ChakraProvider>
                      {showAlert && (
                            <div className="fixed bottom-4 right-4 z-50 w-[320px] text-black">
                              <Alert status="warning" rounded="md">
                                <AlertIcon />
                                {error}
                                <CloseButton position="absolute"  right="2" top="2" onClick={handleCloseAlert} />
                              </Alert>
                            </div>
                          )}
                    </ChakraProvider>
                    <button

                      className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                      type="submit">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
     
    </div>
    
  );
};

export default SignUpForm;
