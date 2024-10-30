import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Quiz = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [quizData, setQuizData] = useState([]);
    const [displayhead, setdisplayhead] = useState("CREATE-QUIZ")

    const handleSaveQuestion = () => {
        const newQuestion = {
            question,
            options: [...options]
        };

        setQuizData([...quizData, newQuestion]);
        setQuestion('');
        setOptions(['', '', '', '']);
        console.log(quizData);
    };
    const exitprocess = () => {
        localStorage.setItem("quizdata", JSON.stringify(quizData));
        setdisplayhead('lets see how much you know about {props.username}');
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="h- w-1/2 cursor-default shadow-2xl shadow-blue-900 p-11 flex justify-around flex-col">
                <h1 className="text-2xl font-bold underline">{displayhead}</h1>
                <div className="h-72 flex flex-col gap-6 mt-6 mb-6">


                    <input
                        className="h-16 bg-cyan-700 font-bold text-xl uppercase"
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => {
                            setQuestion(e.target.value)
                            console.log(question);
                        }


                        }
                    />
                    {options.map((option, index) => (
                        <input
                            key={index}
                            id={index}
                            className="h-10 bg-cyan-700 font-bold text-xl uppercase"
                            type="text"
                            placeholder={`Answer/option ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[index] = e.target.value;
                                setOptions(newOptions);
                            }}
                        />
                    ))}
                </div>
                <div className="flex gap-3 mt-4">
                    <button onClick={handleSaveQuestion} className="button">SAVE Question</button>
                    <button onClick={exitprocess} className="button" to="/">Exit</button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;

