import { Box} from "@mui/material";
import Form from "./form";
import Script from "./script";
import { useState } from "react";


export default function Home({handleToggleLoader}){
    const [scriptData, setScriptData] = useState('')
    const [isWaiting, setIsWaiting] = useState(false)
    
    const handleScriptData =(data)=>{
        if(data){
            handleToggleLoader(false)
            setIsWaiting(false);
            setScriptData(data)
        }
    }

    const handlePitchFetchButton = (data)=>{
        setIsWaiting(data);
        setScriptData('')
    }

    return (
        <Box sx={{display: {xs: 'block', sm: 'block', md: 'flex', lg: 'flex', xl: 'flex'}, width: '100%', gap: '35px'}}>
            <Form updateScriptData={handleScriptData} startLoaderFunction={handleToggleLoader} handlePitchFetchButton={handlePitchFetchButton}/>
            {
                scriptData && !isWaiting ?
                    <Script script={scriptData} wait={isWaiting}/>
                :
                    <Script script={scriptData} wait={isWaiting}/>
            }
        </Box>
    )
}