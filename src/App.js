import logo from './logo.svg';
import {Button, Slider} from "@mui/material";
import './App.css';
import React, {useState} from "react";


function App() {
  const [value, setValue] = useState(55);

  function onSliderchange(event){
    const newValue = event.target.value;
    console.log(newValue);
    setValue(newValue);
  }

  return (
    <div className="App">
      <Slider 
        //style = {{marginTop: 5000}}
        value= {value} 
        onChange={onSliderchange}/>
     
    </div>
  );
}

export default App;
