
import './App.css';
import React, {useState} from "react";
import {Home} from '../home/home';
import {TodoTitle} from '../todoTitle/todoTitle';
import {TodoEdit} from '../todoEdit/todoEdit';
import {TodoTrial} from '../todoTrial/todoTrial';


function App() {

  return (
    <div>
      <Home/>
      <TodoTitle/>
      <TodoEdit/>
      <TodoTrial/>
    </div>

  );
}

export default App;