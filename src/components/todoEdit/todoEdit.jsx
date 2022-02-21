import React, {useState} from 'react';
import './todoEdit.css';
import {TextField, InputAdornment, Box, List, ListItem, ListItemText, Button, } from "@mui/material";
import Add from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { CoronavirusSharp } from '@mui/icons-material';
import { grey } from '@mui/material/colors';


export const TodoEdit = () => {

    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState("Enter Task");

    function handleChange(event){
        setCurrentTask(event.target.value);
    }

    function handleAdd() {
        const task = {name: currentTask, checked: false};
        const newList = tasks.concat(task);
        console.log("adding");
        setTasks(newList);
    }

    function handleDelete(index) {
        console.log(tasks);
        console.log(index);
        const tempList = [...tasks];
        tempList.splice(index,1);
        setTasks(tempList);
    }

    function check(index){
        console.log(tasks.at(index).checked);
        tasks.at(index).checked = !tasks.at(index).checked;
        console.log(tasks.at(index).checked);
        const tempList = [...tasks];
        setTasks(tempList);
    }

    return (
        <div align="center">
            <TextField
                align = "center"
                id="inputTodo"
                size = "large"
                value = {currentTask}
                onChange = {handleChange}
                variant="standard"
            />

            <Button>
                <InputAdornment 
                    onClick = {handleAdd}
                    position="end">
                    <Add />
                </InputAdornment>
            </Button>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <nav aria-label="tasks">
                    <List>
                    {tasks.map((item) => (
                        <TodoItem name ={item.name} index={tasks.indexOf(item)} 
                        handleDelete={handleDelete} check={check} checked={item.checked}/>
                    ))}
                    </List>
                    
                </nav>
            </Box>
        </div>
    );
} 

const TodoItem = (props) => {

    const defaultColors = ['#FFFFFF',  '#FF0000'];

    const [colors, setColors] = useState(['#FFFFFF',  '#FF0000']);
    
    
    function toggleCheck(index){
        console.log("current background: " + colors.at(0));
        console.log("Current accent: " + colors.at(1));
        console.log("Checking");
        props.check(index);
        resetColors();
        console.log("Checked");
    }

    function resetColors(){
        if(props.checked){
            setColors( ['#C8C8C8',  '#000000']);
        }
        else {
            setColors( ['#FFFFFF',  '#FF0000']);
        }
    }
    return (
    <Box
        sx={{
          backgroundColor: colors.at(0)
        }}
    >
    <ListItem >
        <ListItemText primary = {props.name}/>
        <Button  onClick = {() => props.handleDelete(props.index)} style={{ color: colors.at(1)}} > 
            <DeleteOutlineIcon className= {props.checked? "darkGarbage": "lightGarbage"}/>
        </Button>
        <Button onClick = {() => toggleCheck(props.index)} style={{ color: colors.at(1)}}> 
            <CheckBoxOutlinedIcon />
        </Button>
    </ListItem>
    </Box>
    );
}

