import './App.css';
import React, {useState, useContext} from "react";
import {Header} from '../header/header';
import {Home} from '../home/home';
import {Todo} from '../todo/todo';
import {BrowserRouter, Routes, Route} from "react-router-dom";

export const TodoContext = React.createContext();

function App() {
  
  const [tasks, setTasks] = useState([]);

  return (
    <TodoContext.Provider
      value = {{
        tasks, setTasks
      }}>
      <div className="App">
          <BrowserRouter>
          <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo />} /> 
            </Routes>
          </BrowserRouter>
      </div>
    </TodoContext.Provider>
  );
}

export default App;