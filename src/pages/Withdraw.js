import React, { useContext, useState, useEffect } from 'react'
import { BudgetContext } from  '../components/context/BudgetContext';
import { useNavigate } from 'react-router-dom';
// import { PaymentHistoryContext } from '../components/PaymentHistoryContext';

const Withdraw = () => {
const navigate = useNavigate();
  const [balance, setBalance] = useContext(BudgetContext);
  const [newBalance, setNewBalance] = useState(balance);
  const [error, setError] = useState('');
  // const [paymentHistory, setPaymentHistory] = useContext(PaymentHistoryContext);

  useEffect(() => {
    const storedBalance = localStorage.getItem('budget');
    if (storedBalance) {
      setBalance(parseInt(storedBalance));
      setNewBalance(parseInt(storedBalance));
    }
  }, []);

  const handleUpdateBalance = () => {
    if(newBalance < 0){
        setError('Withdraw amount cannot be more than the available balance.');
        setBalance(balance);
    }else{
        setBalance(newBalance);
        // setPaymentHistory(prevHistory => [...prevHistory, payment]);
        // localStorage.setItem('paymentHistory', JSON.stringify([...paymentHistory, payment]));
        localStorage.setItem('budget', newBalance.toString());
        navigate('/budget');
    }
  };

  
  const storedBalance = localStorage.getItem('budget');

  return (
    <div className = "font-dmsans flex flex-col itens-center justify-center h-screen bg-gradient-to-t from-gray-900 via-gray-900 to-black">
        <div className = "mt-24 ml-24">
            <p className = "font-bold text-5xl text-gradient bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
                Withdraw
            </p>
        </div>

        <div className="mt-8 flex flex-col ml-24">
            <label className="mr-2 text-white text-2xl">Input your amount to top up</label>
            <input
            type="number"
            placeholder='100000'
            onChange={(e) => setNewBalance(balance - parseInt(e.target.value ))}
            className="text-white text-2xl w-96 mt-4 border-b border-gray-500 focus:outline-none focus:border-white-500 bg-transparent"
            />
        </div>
        {error && <p className="text-red-500 mt-4 ml-24">{error}</p>}


        <div className="mt-8 ml-24">
            <button
            onClick={handleUpdateBalance}
            className="bg-gradient-to-r from-green-500 via-green-600 to-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
            Proceed to Payment
            </button>
        </div>
    </div>
  )
}

export default Withdraw