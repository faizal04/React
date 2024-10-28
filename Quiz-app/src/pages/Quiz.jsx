import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Quiz = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [quizData, setQuizData] = useState([]); // Array to store all questions and options

    const handleSaveQuestion = () => {
        const newQuestion = {
            question,
            options: [...options]
        };

        setQuizData([...quizData, newQuestion]);
        setQuestion(''); // Clear input after saving
        setOptions(['', '', '', '']);
        console.log(quizData); // Check saved questions in the console
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="h- w-1/2 cursor-default shadow-2xl shadow-blue-900 p-11 flex justify-around flex-col">
                <h1 className="text-2xl font-bold underline">Create Quiz</h1>
                <div className="h-72 flex flex-col gap-6 mt-6 mb-6">


                    <input
                        className="h-16 bg-cyan-700 font-bold text-xl uppercase"
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    {options.map((option, index) => (
                        <input
                            key={index}
                            className="h-10 bg-cyan-700 font-bold text-xl uppercase"
                            type="text"
                            placeholder={`Answer/option ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[index] = e.target.value;
                                setOptions(newOptions);
                                console.log(newOptions)
                            }}
                        />
                    ))}
                </div>
                <button onClick={handleSaveQuestion} className="button">Save Question</button>
                <div className="flex gap-3 mt-4">
                    <Link className="button" to="/next-page">Next</Link>
                    <Link className="button" to="/">Exit</Link>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
