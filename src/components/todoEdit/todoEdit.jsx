import React, {useState} from 'react';
import {TextField, InputAdornment, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, ListItemAvatar} from "@mui/material";
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


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
        //const tempList;
        // for(const i = 0; i<tasks.length; tasks++){
        //     tempList.push(tasks[i]);
        // }
        const oldTask = tempList.splice[index,1];
        setTasks(tempList);
    }

    return (
        <div>
            <TextField
                align = "center"
                id="inputTodo"
                size = "large"
                value = {currentTask}
                onChange = {handleChange}
                // InputProps={{
                // endAdornment: (
                //     <InputAdornment 
                //         onClick = {handleAdd}
                //         position="end">
                //     <Add />
                //     </InputAdornment>
                // ),
                // }}
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
                        <ListItem disablePadding>
                            <ListItemText primary = {item.name}/>
                            <Button value={tasks.indexOf(item)} onClick = {() => handleDelete(tasks.indexOf(item))}> 
                                <DeleteIcon />
                            </Button>
                        </ListItem>
                    ))}
                    </List>
                    
                </nav>
            </Box>
        </div>
        
        
    //   /*(tasks.indexOf(item))*/
    );

    
} 