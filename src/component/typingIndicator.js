import React from 'react';
import { Box } from '@mui/material';
import './css/TypingIndicator.css'; // Import the CSS for blinking dots

const TypingIndicator = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', color: '#555', fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#000' }}>
      Typing
      <Box className="dot">.</Box>
      <Box className="dot">.</Box>
      <Box className="dot">.</Box>
    </Box>
  );
};

export default TypingIndicator;