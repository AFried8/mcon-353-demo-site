import React, {useState} from 'react';
import './todoEdit.css';
import {TextField, InputAdornment, Box, List, ListItem, ListItemText, Button, } from "@mui/material";
import Add from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';


export const TodoEdit = () => {

    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState("Enter Task");

    function handleChange(event){
        setCurrentTask(event.target.value);
    }

    function handleAdd() {
        const task = {name: currentTask, checked: true};
        const newList = tasks.concat(task);
        console.log("adding");
        setCurrentTask("");
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

    const [colors, setColors] = useState(['#FFFFFF',  '#560ba6']);
    
    function toggleCheck(index){
        props.check(index);
        resetColors();
    }

    function resetColors(){
        if(props.checked)
            setColors( ['#C8C8C8',  '#000000']);
        else 
            setColors( ['#FFFFFF',  '#560ba6']);
    }

    return (
    <Box
        sx={{
            borderRadius: '10px',
            backgroundColor: colors.at(0)
        }}
    >
    <ListItem >
        <ListItemText primary = {props.name} />
        <Button onClick = {() => props.handleDelete(props.index)} style={{ color: colors.at(1)}}> 
            <DeleteOutlineIcon  />
        </Button>
        <Button onClick = {() => toggleCheck(props.index)} style={{ color: colors.at(1)}}>  
            <CheckBoxOutlinedIcon />
        </Button>
    </ListItem>
    </Box>
    );
}

