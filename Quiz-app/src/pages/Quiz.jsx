import React, { useState } from 'react';

const Quiz = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [quizData, setQuizData] = useState([]);
    const [displayhead, setdisplayhead] = useState("CREATE-QUIZ");
    const [hide_ele, set_ele] = useState(false);
    const answer = [1, 2, 3, 4];
    const [answerid, setanswerid] = useState();
    let [timer, settimer] = useState(10);


    const handleSaveQuestion = () => {
        const newQuestion = {
            question,
            options: [...options],
            answerid,
        };

        setQuizData([...quizData, newQuestion]);
        setQuestion('');
        setOptions(['', '', '', '']);
        console.log(quizData);
    };

    const exitprocess = async () => {
        // Save quizData to localStorage
        localStorage.setItem("quizdata", JSON.stringify(quizData));
        setdisplayhead('Let’s see how much you know about {props.username}');
        set_ele(true);

        // Retrieve data from localStorage
        const data_backup = JSON.parse(localStorage.getItem("quizdata"));
        console.log(data_backup);

        if (data_backup && data_backup.length > 0) {
            // Loop over each question with a delay
            for (const item of data_backup) {
                setQuestion(item.question);
                setOptions(item.options);
                settimer(10)
                const timerInterval = setInterval(() => {
                    settimer((lastTimer) => {
                        if (lastTimer <= 1) {
                            clearInterval(timerInterval);
                            return 0;
                        }
                        return lastTimer - 1
                    })
                }, 1000);
                await new Promise(resolve => setTimeout(resolve, 10000));
            }
        }

    };


    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="w-1/2 cursor-default shadow-2xl shadow-blue-900 p-11 flex justify-around flex-col">
                <h1 className="text-2xl font-bold underline">{displayhead}</h1>
                <div className="h-1/2 flex flex-col gap-6 mt-6 mb-6">
                    <div className='h-20 w-10 bg-slate-600'>{timer}</div>
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
                            }}
                        />
                    ))}
                    {!hide_ele && (
                        <div className='h-9'>
                            <label className='font-bold text-xl mr-5 ' htmlFor="answer">Answer</label>
                            <select className='text-xl font-bold h-9' name="answer" id="" onChange={(e) => {
                                const answer = e.target.value;
                                setanswerid(answer);
                            }}>
                                {
                                    answer.map((answer, index) => (
                                        <option key={index} value={answer} onChangeCapture={(e) => {
                                            console.log(e.target.value);
                                        }}>
                                            {answer}
                                        </option>
                                    ))
                                }
                            </select>

                        </div>
                    )}
                </div>
                {
                    !hide_ele && (
                        <div className="flex justify-center items-center">
                            <button onClick={handleSaveQuestion} className="button">SAVE Question</button>
                            <button onClick={exitprocess} className="button">Exit</button>
                        </div>
                    )
                }
            </div >
        </div >
    );
};

export default Quiz;
