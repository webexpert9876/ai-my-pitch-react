import { ContentCopy } from "@mui/icons-material";
import { Button, Box, IconButton  } from "@mui/material";
import { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import TypingIndicator from '../component/typingIndicator'; 

const linkIcon ={
    padding: 0
}

export default function Script({script, handlePitchFetchButton, wait}) {
    const [copySuccess, setCopySuccess] = useState('');
    const [scriptText, setScriptText] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);
    
    useEffect(()=>{
        if(wait){
            setIsWaiting(wait);
        }
        if(!wait){
            setScriptText('');
        }

        if(script && !wait){
            setIsWaiting(wait);
            setScriptText(script);
        }
    }, [script, wait])

    const handleCopyClick = () => {
        if (script) {
          navigator.clipboard.writeText(script).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
          }).catch(err => {
            console.error('Failed to copy: ', err);
          });
        }
    }

    return (
        <Box sx={{width: '100%', margin:"16px 0px"}}>
            <Box sx={{minHeight: '610px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #000', padding: '20px', position: 'relative'}}>
            {scriptText != ''&& `${isWaiting}` == `false` ? <Box sx={{ whiteSpace: 'pre-wrap', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', textAlign: 'left' }}>
                    {/* {script} */}
                     <TypeAnimation
                        sequence={[
                            scriptText,
                            1000,
                        ]}
                        wrapper="span"
                        speed={90}
                        // style={{ fontSize: '2em', display: 'inline-block' }}
                        // repeat={Infinity}
                    />
                </Box>
                :
                    <></>
                }
                {isWaiting && <TypingIndicator />}
                {script ? (
                        <Box sx={{position: 'absolute', bottom: 10, right: 0, width: '100%', textAlign: 'end'}}>
                            {copySuccess && <Box component={'span'} style={{ marginLeft: '10px', color: 'green', zIndex: 99 }}>{copySuccess}</Box>}
                            <Button onClick={handleCopyClick} title="Copy to clipboard">
                                <ContentCopy/>
                            </Button>
                        </Box>
                        )
                    : 
                        <Box sx={{position: 'absolute', bottom: 10, right: 0, width: '100%', textAlign: 'end'}}>
                            <Button>
                                <ContentCopy/>
                            </Button>
                        </Box>
                }
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                <IconButton 
                    component="a"
                    href={`https://api.whatsapp.com/send/?text=http%3A%2F%2Faimypit.ch%2F&type=custom_url&app_absent=0`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    sx={linkIcon}
                >
                    <img 
                        src="/whatsapp-50.png"  // Path to the custom WhatsApp icon in the public folder
                        alt="WhatsApp"
                        style={{height: '57px'}}
                    />
                </IconButton>
                <IconButton 
                    component="a" 
                    href={`https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2FshareArticle%2F%3Furl%3Dhttp%253A%252F%252Faimypit.ch%252F`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Linkedin"
                    sx={linkIcon}
                >
                    <img 
                        src="/icons8-linkedin-50.png"  // Path to the custom WhatsApp icon in the public folder
                        alt="Linkedin"
                        
                    />
                </IconButton>
                <IconButton 
                    component="a" 
                    href={`https://www.facebook.com/share_channel/?link=http%3A%2F%2Faimypit.ch%2F&app_id=966242223397117&source_surface=external_reshare&display&hashtag`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    sx={linkIcon}
                >
                    <img 
                        src="/facebook-50.png"  // Path to the custom WhatsApp icon in the public folder
                        alt="Facebook"
                    />
                </IconButton>
                <IconButton 
                    component="a" 
                    href={`https://x.com/intent/post?url=http%3A%2F%2Faimypit.ch%2F`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="X"
                    sx={linkIcon}
                >
                    <img 
                        src="/x-50.png"  // Path to the custom WhatsApp icon in the public folder
                        alt="X"
                    />
                </IconButton>
            </Box>
        </Box>
    )
}