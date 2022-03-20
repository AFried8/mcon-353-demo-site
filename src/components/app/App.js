
import './App.css';
import React, {useState} from "react";
import {Header} from '../header/header';
import {Home} from '../home/home';
import {Todo} from '../todo/todo';
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {

  return (
    <div className="App">
      
        <BrowserRouter>
        <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todo" element={<Todo />} /> 
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;