import { Box, Typography, IconButton } from "@mui/material";

export default function Footer() {
    return(
        <Box sx={{backgroundColor: '#c7bdb0', padding: '15px'}}>
            <Typography variant="h6" component={'h6'}>
                Created by Yuval Canfi 2024
                <IconButton 
                    component="a" 
                    href={`https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2FshareArticle%2F%3Furl%3Dhttp%253A%252F%252Faimypit.ch%252F`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Linkedin"
                    // sx={linkIcon}
                >
                    <img 
                        src="/icons8-linkedin-25.png"  // Path to the custom WhatsApp icon in the public folder
                        alt="Linkedin"
                        
                    />
                </IconButton>
            </Typography>
        </Box>
    )
}