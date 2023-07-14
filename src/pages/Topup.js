import React, { useContext, useState, useEffect } from 'react'
import { BudgetContext } from  '../components/context/BudgetContext';
import { useNavigate } from 'react-router-dom';
import barcode from '../assets/barcode.png'
import Timer from '../components/Timer';

const Topup = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useContext(BudgetContext);
  const [newBalance, setNewBalance] = useState(balance);
  const [showBarcode, setShowBarcode] = useState(false);

  useEffect(() => {
    const storedBalance = localStorage.getItem('budget');
    if (storedBalance) {
      setBalance(parseInt(storedBalance));
      setNewBalance(parseInt(storedBalance));
    }
  }, []);

  const handleUpdateBalance = () => {
    setBalance(newBalance);
    localStorage.setItem('budget', newBalance.toString());
    setShowBarcode(true);
    setTimeout(() => {
      setShowBarcode(false);
    }, 30000);
  };

  const handlePaymentComplete = () => {
    navigate('/budget');
  };
  const storedBalance = localStorage.getItem('budget');

  return (
    <div  className='flex flex-row justify-center h-screen bg-gradient-to-t from-gray-900 via-gray-900 to-black p-12 font-dmsans'>
      <div className = "font-dmsans mt-8 ">
        <p className="text-5xl text-gradient bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text font-bold">Topup</p>
        <p className = "mt-2 text-xl text-white">Top up to your current balance.</p>
        

      <div className="mt-8 flex flex-col">
        <label className="mr-2 text-white text-2xl">Input your amount to top up</label>
        <input
          type="number"
          placeholder='100000'
          onChange={(e) => setNewBalance(balance + parseInt(e.target.value ))}
          className="text-white text-2xl w-96 mt-4 border-b border-gray-500 focus:outline-none focus:border-white-500 bg-transparent"
        />
      </div>

      <div className="mt-8 font-bold">
        <button
          onClick={handleUpdateBalance}
          className="bg-gradient-to-r from-green-500 via-green-600 to-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Proceed to Payment
        </button>
      </div>
      </div>

      {showBarcode && (
            <div className="ml-12 mt-8">
              <p className="text-white text-xl">Here's your barcode:</p>
              <img src={barcode} alt="Barcode" className="mt-4 w-96" />
         
              <p className="text-red-500 font-bold text-md mt-4">
              <Timer/>
                Please complete the payment within 30 seconds.
              </p>
              <button
                onClick={handlePaymentComplete}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 focus:outline-none focus:shadow-outline"
              >
                I have finished my payment
              </button>
            </div>
          )}
      </div>
  )
}

export default Topup