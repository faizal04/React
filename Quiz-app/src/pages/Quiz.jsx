import React from 'react';
import { Link } from 'react-router-dom';
const Quiz = () => {
    return (
        <>
            <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500'>
                <div className="h- w-1/2 cursor-default shadow-2xl shadow-blue-900 p-11 flex justify-around flex-col">
                    <h1 className="text-2xl font-bold underline">
                        Create Quiz
                    </h1>
                    <div className='h-72 flex flex-col gap-6 mt-6 mb-6'>
                        <input className='h-16 bg-cyan-700 font-bold text-xl' type="text" placeholder='Question' name="" id="" />
                        <input className='h-10 bg-cyan-700 font-bold text-xl' type="text" placeholder='Answer/option' name="" id="" />
                        <input className='h-10 bg-cyan-700 font-bold text-xl' type="text" placeholder='Answer/option' name="" id="" />
                        <input className='h-10 bg-cyan-700 font-bold text-xl' type="text" placeholder='Answer/option' name="" id="" />
                        <input className='h-10 bg-cyan-700 font-bold text-xl' type="text" placeholder='Answer/option' name="" id="" />

                    </div>
                    <div className='flex gap-3'>
                        <Link class="button">
                            <span class="button-bg"></span>
                            <span class="button-overlay"></span>
                            <span class="button-text">Next</span>
                        </Link>
                        <Link class="button">
                            <span class="button-bg"></span>
                            <span class="button-overlay"></span>
                            <span class="button-text">Exit</span>
                        </Link>

                    </div>






                    {/* <h3 className="text-xl font-bold mb-4">
                        Welcome to Quiz Mates — the ultimate quiz spot for friends! Here, you can create custom quizzes to challenge your friends and see how well they really know you. Share laughs, uncover fun facts, and make every quiz a journey into friendship. Are you ready to put your friendships to the test?
                    </h3> */}
                </div>




            </div>
        </>
    )
}
export default Quiz