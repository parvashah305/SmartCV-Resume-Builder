import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import PersonalInfo from './Components/PersonalInfo';
import Education from './Components/Education';
import Experience from './Components/Experience';
import Projects from './Components/Projects';
import Skills from './Components/Skills';
import Footer from './Components/Footer';
import './Components/FormStyles.css'
import Login from './Components/Login';
import Signup from './Components/Signup';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<PersonalInfo />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </div>
        <Footer />
        
      </div>
      
    </Router>
    
  );
}

export default App;

