import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Abouts from '../pages/Abouts';
const Header = () => {
    const [name, setname] = useState("Faisal");
    return (
        <>
            <nav className='h-20 w-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center p-4'>
                <div className='flex-1'>
                    <h1 className='text-2xl font-semibold from-stone-800 ml-8'> Welcome👋 {name}</h1>
                </div>
                <div className='flex-1'>
                    <h1 className='text-2xl font-semibold from-stone-800 ml-8'>LOGO</h1>
                </div>
                <div className='flex-initial w-52 flex justify-between mr-32'>
                    <Link className='text-2xl font-semibold from-stone-800 hover:underline' to="/about">About</Link>
                    <Link className='text-2xl font-semibold from-stone-800 hover:underline' to="/quiz"> Quiz</Link>
                </div>
            </nav>
        </>
    )
}
export default Header


