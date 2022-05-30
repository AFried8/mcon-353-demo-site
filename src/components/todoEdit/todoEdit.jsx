import React, {useState, useContext} from 'react';
import './todoEdit.css';
import {TextField, InputAdornment, Box, List, ListItem, ListItemText, Button, } from "@mui/material";
import Add from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import {TodoContext} from '../app/App.jsx';


export const TodoEdit = () => {

    const {tasks, setTasks} = useContext(TodoContext);
    const [currentTask, setCurrentTask] = useState("Enter Task");

    function handleChange(event){
        setCurrentTask(event.target.value);
    };

    function handleAdd() {
        const task = {name: currentTask, checked: true};
        const newList = tasks.concat(task);
        console.log("adding");
        setCurrentTask("");
        setTasks(newList);
    };

    function handleDelete(index) {
        const tempList = [...tasks];
        tempList.splice(index,1);
        setTasks(tempList);
    };

    function check(index){
        console.log(tasks.at(index).checked);
        tasks.at(index).checked = !tasks.at(index).checked;
        console.log(tasks.at(index).checked);
        const tempList = [...tasks];
        setTasks(tempList);
    };

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
};

const TodoItem = (props) => {
    const colors = props.checked?  ['#C8C8C8',  '#000000']: ['#FFFFFF',  '#560ba6'];
    
    function toggleCheck(index){
        props.check(index);
    };

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
};