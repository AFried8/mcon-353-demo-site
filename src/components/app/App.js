
import {Button, Slider} from "@mui/material";
import './App.css';
import React, {useState} from "react";
import {Home} from '../home/home';
import {Todo} from '../todo/todo';


function App() {

  return (
    <div>
      <Home/>
      <Todo/>
    </div>
    
  );
}

export default App;
