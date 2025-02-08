import React from 'react';
import { Router, Routes, Route, HashRouter } from 'react-router-dom';
import Hero from './components/Hero';
import Notes from './components/Notes';
import Login from './components/Login';
import SignUp from './components/Signup';
import Welcome from './components/Welcome';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
