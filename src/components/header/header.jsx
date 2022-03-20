import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    let navigate = useNavigate();

    const goHome = () => {
        navigate('/');
      };

    const navTo = (route) => {
        navigate(route);
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Button 
                color="inherit"
                onClick={() => navTo('/')}
                >
                Demo</Button>
            <Button 
                color="inherit"
                onClick={() => navTo('/todo')}
            >Todo List</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
