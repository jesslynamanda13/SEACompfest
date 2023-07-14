import React, { useState, useEffect } from "react";
import moviesimg from "../assets/movies-login.jpg";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo-sea.png";
import { useUserAuth } from "../components/context/UserAuthContext";
import { Box, Button, ChakraProvider, Alert, AlertIcon, CloseButton } from '@chakra-ui/react';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, logIn} = useUserAuth();
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
 
  const handleSignIn = async(e) =>{
      e.preventDefault();
      setError("");
      try{
        await logIn(email, password);
        navigate('/explore');
      }catch (err){
        setError(err.message)
        setShowAlert(true)
      }
  }
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  
  return (
    <div>
    
        <div>
          <div className="flex flex-row">
            <div className="w-1/2 h-screen md:none">
              <img
                className="object-cover h-full w-full"
                src={moviesimg}
                alt="login-movies"
              />
            </div>

            <div className="w-1/2 h-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
              <form onSubmit = {handleSignIn}>
                <div className="text-white p-40 flex flex-col font-dmsans">
                  <img src={logo} alt="logo" className="w-20" />
                  <p className="mt-8 font-dmsans text-2xl font-semibold">
                    Sign in
                  </p>
                  <p className="mt-2 font-md">
                    Don't have an account yet!{" "}
                    <Link to="/sign-up" className="font-bold underline">
                      Sign up here
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
                                <div className="fixed bottom-4 right-4 w-[320px] z-50 text-black">
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
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default SignIn;

// const handleClick = () => {
  //   signInWithPopup(auth, provider).then((data) => {
  //     const user = data.user;
  //     setValue(user.email);
  //     localStorage.setItem("email", user.email);
     
  //     window.location.reload();

  //   });
  // };