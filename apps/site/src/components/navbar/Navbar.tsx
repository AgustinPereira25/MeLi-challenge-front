import React from 'react'
import SearchInput from './searchInput/SearchInput'
import { useNavigate } from 'react-router'
import logo from '../../assets/Logo_ML.png'

export const Navbar:React.FC = () => {
  const navigateTo = useNavigate();
  
  return (
    <div className='flex items-center w-full bg-[#fff159] h-16 px-36'>
        <div onClick={() => navigateTo('/')} className="flex flex-col justify-center items-center pr-3">
          <img
            className='cursor-pointer' 
            alt="ML logo" 
            src={logo}
            height={70}
            width={60}
          />
        </div>
        <SearchInput />
    </div>
  )
}
