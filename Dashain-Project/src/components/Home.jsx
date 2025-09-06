import React from 'react'
import { useState, useEffect } from 'react';
import dashain from '../assets/dashain1.png'
import mangaldhun from '../assets/mangaldhun.mp3'
import { NavLink } from 'react-router-dom';

export const Home = () => {
    const calculateDaysLeft = () => {
    const todayDate = new Date();
    const dashainDate = new Date('2025-10-02');
    const timeDiff = dashainDate - todayDate;
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    };
    
    const [daysLeft, setDaysLeft] = useState(calculateDaysLeft());
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        const timer = setInterval(() => {
        setDaysLeft(calculateDaysLeft());
        }, 60 * 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSubscribe = async () => {
    if (!email) {
    setMessage("Enter your email!");
    return;
    }
    try {
    const res = await fetch("https://email-subscribe-twrm.onrender.com/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    const data = await res.json(); 
    setMessage(data.message || data.detail);
    setEmail("");
    } catch (err) {
    console.error(err);
    setMessage("Something went wrong");
    }
};

return (
    <div className='m-0 w-full h-[100vh] flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
    <img src={dashain} alt="dashain-image" className='h-[150px]'/>
    <h1 className='mt-2 font-serif text-4xl'> Happy Dashain !</h1>
    <audio controls src={mangaldhun} className='mt-3'></audio>
    <p className='mt-3 text-xl text-indigo-500 font-medium'>{daysLeft > 1 ? "Days" : "Day"} left for Dashain</p>
    </div>
    <div className='mt-3 p-3 rounded-lg width-[200px]'>
        <span className='text-4xl font-bold width-[200px]'>{daysLeft}</span>
    </div>
    <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-sans font-semibold'> Email Subscribe</h1>
        <p className='mt-1 p-2 font-thin w-full '> You'll get notified based on days left for Dashain.</p>
    </div>
    <div className='mt-3 flex flex-col justify-center items-center'>
        <input type="email" placeholder='Enter Your Email' value={email} onChange={e => setEmail(e.target.value)} className='w-[320px] h-10 border-1 rounded-xl bg-white border-purple-400 focus:outline-purple-500 p-3'/>
        <button onClick={handleSubscribe} className='mt-3 bg-indigo-500 text-white w-[320px] rounded-xl p-2 cursor-pointer hover:bg-indigo-600 drop-shadow-amber-50 text-lg'> Add Subscribe</button>
        <p className='mt-2 '>{message}</p>
    </div>
    <div className='mt-3'>
        <NavLink to='/aboutblog' >
            <a href="" className='hover:text-blue-400'>Learn more About Dashain →</a> 
        </NavLink>
        

    </div>
    </div>
)
}
