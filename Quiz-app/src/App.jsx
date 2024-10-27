import React from 'react';
import Header from './components/Header';
import Abouts from './pages/Abouts';
import Quiz from './pages/Quiz';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      {location.pathname === '/' && (
        <section className="h-screen w-full bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center">
          <div className="h-1/2 w-1/2 cursor-default shadow-2xl shadow-blue-900 p-11 flex justify-around flex-col items-center">
            <h1 className="text-2xl font-bold underline mb-4">
              Create quizzes, share laughs, and see who knows you best!
            </h1>
            <h3 className="text-xl font-bold mb-4">
              Welcome to Quiz Mates — the ultimate quiz spot for friends! Here, you can create custom quizzes to challenge your friends and see how well they really know you. Share laughs, uncover fun facts, and make every quiz a journey into friendship. Are you ready to put your friendships to the test?
            </h3>
            <Link to="/quiz" class="button">
              <span class="button-bg"></span>
              <span class="button-overlay"></span>
              <span class="button-text">Create Quiz</span>
            </Link>
          </div>
        </section>
      )}


      <Routes>
        <Route path="/about" element={<Abouts />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  );
};

export default App;
