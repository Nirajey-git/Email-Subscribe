import React, { useState, useEffect} from 'react'
import dashain from './assets/dashain1.png'
import mangaldhun from './assets/mangaldhun.mp3'
import { AboutBlog } from './components/AboutBlog'
import { Home } from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



export const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-[#F8F8FF] text-black'} `}>
      <button onClick={handleDarkMode} className='absolute top-2 right-7 text-3xl cursor-pointer'>{darkMode ? '🌙' : '☀️'}</button>
      <div className='m-0 w-full h-[100vh] flex flex-col items-center justify-center'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/aboutblog' element={<AboutBlog/>} />
        </Routes>
      </div>
      
        
    </div>
  
  )
}


// w-[100%] h-[100vh] flex flex-col items-end justify-center overflow-hidden