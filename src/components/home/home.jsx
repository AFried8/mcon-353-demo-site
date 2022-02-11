import {Button, Box, Card, CardContent, Typography} from "@mui/material";
import './home.css';
import React, {useState} from "react";
import { typography } from "@mui/system";


export const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Box
            sx={{
              width: 300,
              height: 100,
              border: '1px dashed red'
            }}
          >
            <typography sx={{ mb: 1.5 }}>Aliza Fried</typography>
          </Box>
        </p>
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              My favorite book:
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Cat in the Hat
            </Typography>
          </CardContent>
        </Card>
        <Button size="medium">More About Me</Button>
      </header>
    </div>
  );
};

