import './App.css';
import Header from './theme/layout/header';
import Footer from './theme/layout/footer';
import { Container, Box } from '@mui/material';
import Home from './Home/home';
import LoadingOverlay from './component/LoadingOverlay';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);

  const handleLoader = (loading)=>{
    setLoading(loading)
  }

  return (
    <div className="App">
      {loading && <LoadingOverlay />}
      <Box  sx={{backgroundColor: '#efe7dd', padding: {xs: '0px 20px', sm: '0px 0px'}}}>
        <Header/>
        <Container sx={{width: '100%', padding: {
          xs: '11px 0px',
          sm: '11px 30px',
          md: '11px 40px',
          lg: '11px 60px',
          xl: '11px 60px'
        }, marginBottom: '250px'}}>
          <Home handleToggleLoader={handleLoader}/>
        </Container>
        <Footer/>
      </Box>
    </div>
  );
}

export default App;
