import React from 'react';
import { Box } from '@mui/material';

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#6662628f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(0px)'
      }}
    >
      <img src="http://aimypit.ch/assetes/images/load-37_256.gif" alt="Loading..." style={{ width: '100px', height: '100px' }} />
    </Box>
  );
};

export default LoadingOverlay;