import React, { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  function previous() {
    if (step > 1) setStep(step - 1);
  }

  function next() {
    if (step < 3) setStep(step + 1);
  }

  let btnstyle = { backgroundColor: "#7950f2", color: "#fff" };
  return (
    <div>
      <button
        className="close"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step === 1 ? "active" : ""}`}>1</div>
            <div className={`${step === 2 ? "active" : ""}`}>2</div>
            <div className={`${step === 3 ? "active" : ""}`}>3</div>
          </div>
          <p className="message">{messages[step - 1]}</p>

          <div className="buttons">
            <button style={btnstyle} onClick={previous}>
              previous
            </button>
            <button style={btnstyle} onClick={next}>
              next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
