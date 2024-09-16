import { Box } from "@mui/material";

export default function Header () {
    return (
        <Box sx={{backgroundColor: '#efe7dd', padding: '30px 0px'}}>
            <Box >
                <img 
                    src="/AI-my-pitch-logo.png"
                    alt="Ai my pitch logo"
                    style={{width: '95%', maxWidth: '670px'}}
                />
            </Box>
        </Box>
    )
}