import React, { useEffect } from 'react';
import NavbarLogin from '../components/NavbarLogin';
import topup from '../assets/topup.png'
import withdraw from '../assets/withdraw.png'
import history from '../assets/history.png'
import { useNavigate } from 'react-router-dom';
const Budget = () => {
  const navigate = useNavigate();
 
  useEffect(() => {
    const storedBalance = localStorage.getItem('budget');
  }, []);
  

  const storedBalance = localStorage.getItem('budget');

  return (
    <div className='bg-gradient-to-t from-gray-900 via-gray-900 to-black p-8 font-dmsans font-bold h-screen'>
      <NavbarLogin/>

      <div className='flex flex-row justify-between px-8'>

      <div className='flex flex-row bg-white rounded-3xl py-6 px-8 align-middle mt-12'>
        <div className='flex flex-col mt-4'>
          <p className='text-2xl'>Your balance</p>
          <p className='text-5xl'>Rp. {storedBalance}</p>
        </div>

        <div className="ml-16 flex flex-col items-center">
          <img src={topup} onClick = {()=>navigate('/budget-topup')} alt="topup" className='cursor-pointer w-18 h-auto' />
          <p className="text-lg mt-1">Top Up</p>
        </div>

        <div className="ml-12 flex flex-col items-center">
          <img src={withdraw} onClick = {()=>navigate('/budget-withdraw')} alt="topup" className='cursor-pointer w-18 h-auto' />
          <p className="text-lg mt-1">Withdraw</p>
        </div>

        <div className="ml-12 flex flex-col items-center">
          <img src={history} alt="topup" className='w-18 h-auto' />
          <p className="text-lg mt-1">History</p>
        </div>  
      </div>

      <div className = "flex flex-row rounded-3xl bg-gradient-to-r from-amber-200 to-yellow-400 py-6 px-8 align-middle mt-12">
        <div className='flex flex-col mt-4'>
            <p className='text-xl'>Your credit card</p>
            <p className='text-5xl font-mono'>0020xxxxxx</p>
          </div>
        <div>
          <p className = "ml-12 text-lg mt-24">BCA Mobile</p>
       </div>

      </div>
    </div>

      <div className = "flex flex-row px-8">
        <div className = "flex flex-col">
          <p className = "mt-12 font-dmsans text-5xl text-white ">
            Now, easier transaction with <span className = "text-green-400">GoPay!</span>
          </p>
          <p className = "mt-6 font-dmsans text-lg text-white w-4/5 text-justify">
          We are excited to announce that SEACinema has partnered with GoPay, making your movie ticket purchases and transactions even more convenient than ever before. With this partnership, we aim to enhance your movie-watching experience by providing a seamless and hassle-free payment process.
          </p>
          <p className = "mt-2 font-dmsans text-lg text-white w-4/5 text-justify">
          At SEACinema, we are committed to providing you with the best movie experience, and our partnership with GoPay is just one way we're striving to make your transactions easier and more convenient.
          </p>
          <button className = "mt-8 mb-12 border rounded-full p-2 px-4 w-48 font-dmsans text-white text-lg">Link your account</button>
        </div>    
      </div>
    </div>
  );
};

export default Budget;
