import React, { useState } from 'react';

const Quiz = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [quizData, setQuizData] = useState([]);
    const [displayhead, setdisplayhead] = useState("CREATE-QUIZ");
    const [hide_ele, set_ele] = useState(false);
    const answer = ["select", 1, 2, 3, 4];
    const [answerid, setanswerid] = useState();
    let [timer, settimer] = useState(10);
    let [exit, setexit] = useState(false);
    let [points, setpoints] = useState(0);


    const handleSaveQuestion = () => {
        if (!answerid || answerid === "select") {
            alert("jdfhjd");
            return 0;
        }
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
        setexit(true);
        localStorage.setItem("quizdata", JSON.stringify(quizData));
        setdisplayhead('Let’s see how much you know about {props.username}');
        set_ele(true);

        // Retrieve data from localStorage
        const data_backup = JSON.parse(localStorage.getItem("quizdata"));
        console.log(data_backup);

        if (data_backup && data_backup.length > 0) {
            console.log(data_backup);
            for (const item of data_backup) {
                setQuestion(item.question);
                setOptions(item.options);
                setanswerid(item.answerid);
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
            endquiz();
        }

    };
    const endquiz = () => {
        console.log(`your total points are ${points}`);
    }


    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="w-1/2 cursor-default shadow-2xl shadow-blue-900 p-11 flex justify-around flex-col">
                <h1 className="text-2xl font-bold underline">{displayhead}</h1>
                <div className="h-1/2 flex flex-col gap-6 mt-6 mb-6">
                    <div className=' text-2xl font-bold h-10 w-10'>{timer}</div>
                    <input
                        className="h-16 bg-cyan-700 font-bold text-xl uppercase"
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />


                    {!exit &&
                        options.map((option, index) => (
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
                        ))
                    }
                    {exit &&
                        options.map((option, index) => (
                            <input
                                key={index}
                                className="h-10 bg-cyan-700 font-bold text-xl uppercase"
                                type="text"
                                placeholder={`Answer/option ${index + 1}`}
                                value={option}
                                onClick={(e) => {
                                    if (+answerid === index + 1) {
                                        e.target.style.backgroundColor = "green";
                                        setpoints((previousPoints) => previousPoints + 10);
                                        // console.log("correct answer");
                                        // console.log(+answerid);
                                        // console.log(index + 1);

                                    }
                                    else {
                                        e.target.style.backgroundColor = "red";
                                    }
                                    setTimeout(() => {
                                        e.target.style.backgroundColor = "#0e7490"
                                    }, 1000);


                                }}
                            />
                        ))
                    }

                    {!hide_ele && (
                        <div className='h-9'>
                            <label className='font-bold text-xl mr-5 ' htmlFor="answer">Answer</label>
                            <select className='text-xl font-bold h-9' name="answer" id="" onChange={(e) => {

                                const answer = e.target.value;
                                if (answer === "select")
                                    alert("select answer");
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


        // pending functions 
        // deactivate the input tag after exit btn is pressed 
        // show points in a dialog box
        // make responsive
        // write about page
        // take username from user and print it on screen
        // upload a logo
        // after one option is selected no other option should be clicked
