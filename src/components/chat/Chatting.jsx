import React, { useEffect, useState } from "react";
import {Menu, List, TextField, Typography, Box, Button, Grid, Card} from "@mui/material";
import {FormControl, InputLabel, Select, MenuItem, CardContent} from "@mui/material";
import {Paper, InputBase, IconButton, } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useInterval} from '../../hooks/use-interval';
import './chatting.css';


export const Chatting = () => {

    const [username, setUsername] = useState("");

    return (
        <div className="app">
            <Typography variant="h2"> Chat away</Typography><br/>
            <DisplayUsername
                username = {username}
                submitUsername = {setUsername} />
            <Chat username= {username}/>
                
        </div>
    );
    
}

const DisplayUsername = (props) => {
    const username = props.username;
    if(username == ""){
        return (
            <CreateUsername
                setUsername = {props.submitUsername} 
                username = {props.username}/>
        );
    }
    else {
        return(
            <Typography
                variant = "h5">
                Username: {username}
            </Typography>
        );
    }
}
const CreateUsername = (props) => {

    const [currentText, setCurrent] = useState("");

    function handleChange(event){
        setCurrent(event.target.value);
    }
    
    function handleSubmit(){
        props.setUsername(currentText);
    }
      
    return (
        <Box>
            <Typography
                variant = "h5">
                Create a username
            </Typography>            
            <TextField
                onChange = {handleChange}
            /><br/>
            <Button 
                style = {{marginTop: 5}}
                variant="contained"
                onClick = {handleSubmit}
            >Submit Username</Button>
        </Box>
    );
}

const Chat = (props) => {

    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const [messages, setMessages] = useState([]);

    useInterval((params) => {
          const chatId = params[0];
          var call = "https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/"+chatId+"/messages";
          fetch(call)
            .then((response) => response.json())
            .then((data) => {setMessages(data.Items);});
        },
        1000,
        currentChat.id
      );


    return (
        <Grid container spacing = {2} sx={{mt: 3}}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
                <AddChat setCurrentChat = {setCurrentChat}/>
                <SelectChat
                    chats = {chats}
                    setChats = {setChats}
                    currentChat = {currentChat}
                    setCurrentChat = {setCurrentChat}
                    setMessages = {setMessages}/>
                <DisplayMessages 
                    messages={messages} 
                    username={props.username} 
                    currentChat={currentChat}/>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    );
}

const AddChat = (props) => {

    const [currentText, setCurrent] = useState("");
    const [chatData, setChatData] = useState({});

    function handleChange(event){
        setCurrent(event.target.value);
    }
    
    function handleSubmit(){
        
        const chat = {
            name: currentText
          };
          
        fetch('https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats', {
            method: "PUT",
            headers: {
              "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
            },
            body: JSON.stringify(chat),})
            .then((response) => response.json())
            .then((data) => setChatData(data.Item));
          
            setCurrent("");
    }
      
    return (
        <Box>
            <Typography
                variant = "h5">
                Create a new chat
            </Typography>            
            <TextField
                value={currentText}
                onChange = {handleChange}
            /><br/>
            <Button 
                style = {{marginTop: 5}}
                variant="contained"
                onClick = {handleSubmit}
            >Create Chat</Button>
        </Box>
    );
}
    
const SelectChat = (props) => {

    const currentChat = props.currentChat;

    const chatOpening = () => {
        fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats")
            .then((response) => response.json())
            .then((data) => props.setChats(data.Items));
    }
    const handleChange = (event) => {
        props.setCurrentChat(event.target.value);
        console.log(currentChat);
    }

    return (
        <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Select a chat</InputLabel>
        <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={currentChat}
            onChange={handleChange}
            onOpen={chatOpening}
            label="SelectChat"
        >
            {props.chats.map((item) => (
                <MenuItem value={item}>{item.name}</MenuItem>
            ))}
            
            
        </Select>
        </FormControl>
    );
}

const DisplayMessages = (props) => {

    const [message, setMessage] = useState("Enter Message");

    const handleChange = (event) =>{
        setMessage(event.target.value);
        console.log(message);
    }

    const handleSubmit = (event) => {
        const newMessage = {
                        chatId: props.currentChat.id, 
                        username: props.username,
                        text: message
                    }

        fetch('https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(newMessage),
            }).then((response) => response.json());
            setMessage("");
    }

    return (
        <div>
            <Box borderRadius={2} sx={{mt: 2, p: 2, border: '2px solid', borderColor: 'black' }}>
            <Typography variant='h3'>{props.currentChat.name}</Typography>
            {props.messages.reverse().map((item) => (
                <Message myUsername={props.username} messageUsername={item.username} text={item.text}/>
                
            ))}
            
            <InputBase
                sx={{ ml: 1, mt: 2, flex: 1 }}
                placeholder={message}
                inputProps={{ 'aria-label': 'Enter Message' }}
                onChange = {handleChange}                
            />
            <IconButton type="submit" sx={{ p: '10px', color: 'green'}} onClick={handleSubmit}>
                <SendIcon />
            </IconButton>
            </Box>
            
        </div>
    )
}

const Message = (props) => {

    const fillColor = props.messageUsername === props.myUsername? ['#808080']: ['FFFFFF']

    return (
        <Card sx={{m:1, alignSelf:'right'}}>
                    <Typography sx={{ fontSize: 14, bgColor: fillColor}} color="text.secondary" gutterBottom>
                    {props.messageUsername}
                    </Typography>
                    <Typography variant="h5" component="div">
                    {props.text}
                    </Typography>
                </Card>
    )
}