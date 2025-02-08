import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const handlenotes = () => {
    navigate('/notes');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
      <h2 className="text-4xl font-bold mb-4 text-center text-gray-100">
        Welcome to <span className="text-blue-500">Notezy</span> !!
      </h2>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Here you can create, edit, and delete notes with ease.
      </p>

      <button
        onClick={handlenotes}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Get Started
      </button>
    </div>
  );
}

export default Welcome;