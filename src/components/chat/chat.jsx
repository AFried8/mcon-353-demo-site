import * as React from 'react';
import {Menu, List, TextField, Typography, Box, Button, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import {FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import {ListItem, ListItemText, ListItemButton} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useInterval} from '../../hooks/use-interval';
import { useState } from 'react';

export const Chat = () => {

    const [currentRoom, setRoom] = useState();
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [currentChat, setCurrentChat] = useState({id: '', name: ''});

    return (
        <div className="app">
            <Typography variant="h2"> Chat away</Typography><br/>
            <DisplayUsername
                username = {username}
                submitUsername = {setUsername} />
            <Box
            sx={{
                marginLeft: 5,
                width: 500,
                maxWidth: '70%',
              }}>
                <ChatMenu 
                    currentChat={currentChat}
                    setCurrentChat = {setCurrentChat}/>
                <MessageList 
                    roomId={currentRoom}
                    messages={messages} />                
                <SendMessage />
            </Box>
        </div>
    );
}


const ChatMenu = (props) => {
    const [chats, setChats] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats")
            .then((response) => response.json())
            .then((data) => setChats(data.Items));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (event) => {
        //props.setCurrentChat(event);
        selectedChat = props.currentChat.name;
        console.log(event.name);
        console.log(selectedChat);
        handleClose();
    }
     
    var selectedChat = "Select a chat";
    // if(props.currentChat == ""){
    //     selectedChat = "Select chat";
    // }
    // else{
    //    selectedChat = props.currentChat;
    // }
   
    return (
        <div>
           <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {selectedChat}
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
                {chats.map((item) => (
                    <MenuItem key={item.id} 
                            onClick = {handleItemClick(item)}>
                        {item.name}
                    </MenuItem>
                    ))}
            </Menu>
                         
      </div>
    );
  }

//   const ChatName = (props) => {

//     function handleClick (index) {
//         props.setCurrentChat(index);
//         console.log("selected chat is" + props.chat);
//     }
//       return (
//         <ListItemButton onClick={handleClick(props.chatIndex)}>
//             <ListItemText primary={props.chatName} />
//         </ListItemButton>
//       )
//   }

const MessageList = (props) => {
    return (
        <div>
            <div>
                {props.currentRoom}
            </div>
            <ul>
                {props.messages.map((message) => {
                    return (
                    <li>
                        {message.sender}
                        {message.text}
                    </li>
                    )
                })}
            </ul>
        </div>
    )
};

const SendMessage = () => {
    const [message, setMessage] = useState('');
        
    function handleChange(event) {
        setMessage(event.target.value)
    };
    
    // handleSubmit(e) {
    //     e.preventDefault()
    //     this.props.sendMessage(this.state.message)
    //     this.setState({
    //         message: ''
    //     })
    // }
    return (
        <form
            //onSubmit={handleSubmit}
            >
            
            <TextField 
                fullWidth 
                onChange = {handleChange}
                value = {message}
                placeholder = "Type your message here"/>
        </form>
    )
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

