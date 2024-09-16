import { ContentCopy, Height } from "@mui/icons-material";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { fetchPitch } from "../apiService/fetchFunction";

const inputCss = {
    backgroundColor: '#fff',
    borderRadius: '5px',
    "& .MuiOutlinedInput-root": {
          color: "#000",
          borderRadius: '6px',
          "& .MuiOutlinedInput-notchedOutline": {
            border: '1px solid #000'
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
               border: '2px solid #000'
            },
          },
        },
        "& .MuiInputLabel-outlined": {
          border: '2px solid #000'
        },
}

const inputCssAddPrompt = {
    backgroundColor: '#fff',
    borderRadius: '5px',
    "& .MuiOutlinedInput-root": {
          color: "#000",
          borderRadius: '6px',
          height: '40px',
          "& .MuiOutlinedInput-notchedOutline": {
            border: '1px solid #000'
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
               border: '2px solid #000'
            },
          },
        },
        "& .MuiInputLabel-outlined": {
          border: '2px solid #000'
        },
}

const suggestionCss={
    padding:{xs:'10px 15px', sm:'10px 18px', md:'10px 18px', xl:'10px 18px'},
    backgroundColor:'#fff',
    marginBottom: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: {xs: '12px', sm: '15px', md: '15px', lg: '15px'}
}
const suggestionAddCss={
    padding:'10px 16px',
    backgroundColor:'#5271ff',
    color: '#fff',
    marginBottom: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: {xs: '12px', sm: '15px', md: '15px', lg: '15px'}
}

export default function Form({updateScriptData, startLoaderFunction, handlePitchFetchButton}) {
    const [isAddPrompt, setIsAddPrompt] = useState(false);
    const [suggestions, setSuggestions] = useState([
        {
            id: 1,
            text: '🎣 Add a hook',
            value: 'Please add a compelling sales hook to the pitch',
            isSelected: false
        },
        {
            id: 2,
            text: '🤝 Give Intro',
            value: 'Create an engaging introduction for the pitch, limited to 3-4 lines',
            isSelected: false
        },
        {
            id: 3,
            text: '📅 Solicit a meeting',
            value: 'Include a clear request for a meeting in the pitch',
            isSelected: false
        },
        {
            id: 4,
            text: '😊 Friendly',
            value: 'Rewrite the pitch to be more friendly and inviting',
            isSelected: false
        },
        {
            id: 5,
            text: '💼 Professional',
            value: 'Adjust the pitch to be more professional in tone',
            isSelected: false
        },
        {
            id: 6,
            text: '🦋 Simplify',
            value: 'Simplify the pitch to make it more straightforward and easy to grasp',
            isSelected: false
        },
        {
            id: 7,
            text: '😂 Humorous',
            value: 'add light humor',
            isSelected: false
        },
        {
            id: 8,
            text: '⏳ Add Urgency',
            value: 'Incorporate a sense of urgency into the pitch',
            isSelected: false
        },
        {
            id: 9,
            text: '🎩 Add Personalize',
            value: `Tailor the pitch to be more personalized for the potential customer's business`,
            isSelected: false
        },
        {
            id: 10,
            text: '🎯 Shorten',
            value: 'Shorten the pitch, making it more concise and to the point',
            isSelected: false
        },
        {
            id: 11,
            text: '👍 Emphasize benefits',
            value: 'Rewrite the pitch to emphasize the benefits for the potential customer',
            isSelected: false
        },
        {
            id: 12,
            text: '😃 Personalize',
            value: `Tailor the pitch to be more personalized for the potential customer's business`,
            isSelected: false
        },
        {
            id: 13,
            text: '📊 Supporting data',
            value: 'Include relevant supporting data or statistics to strengthen the pitch',
            isSelected: false
        }
    ])
    const [newSuggestionPrompt, setNewSuggestionPrompt]= useState('');
    // State for input values and errors
    const [website, setWebsite] = useState('');
    const [customerWebsite, setCustomerWebsite] = useState('');
    const [buyer, setBuyer] = useState('');
    const [prompt, setPrompt] = useState('');

    const [websiteError, setWebsiteError] = useState(false);
    const [customerWebsiteError, setCustomerWebsiteError] = useState(false);
    const [buyerError, setBuyerError] = useState(false);
    const [promptError, setPromptError] = useState(false);

    const handleAddPromptInput = ()=>{
        setIsAddPrompt(true);
    }
    const handleAddPrompt = ()=>{
        const lastId = suggestions.length > 0 ? suggestions[suggestions.length - 1].id : 0;

        // Create the new suggestion
        const newSuggestion = {
            id: lastId + 1,
            text: newSuggestionPrompt,
            value: newSuggestionPrompt,
            isSelected: true,
        };
        let updatedPrompt = prompt ? `${prompt} and ${newSuggestionPrompt}` : newSuggestionPrompt;
        setPrompt(updatedPrompt);

        // Update the suggestions list by adding the new suggestion
        const updatedSuggestionList = [...suggestions, newSuggestion];

        // Set the new suggestions state
        setSuggestions(updatedSuggestionList);
        setNewSuggestionPrompt('')
        setIsAddPrompt(false)
    }

    const handleAvailableSuggestion = (selectedSugg) =>{
        if(selectedSugg.isSelected == false) {
            let updatedPrompt = prompt ? `${prompt} and ${selectedSugg.value}` : selectedSugg.value;
            setPrompt(updatedPrompt);
        } else {
            const splitPrompts = prompt.split(' and ');
            let updatedPrompt = splitPrompts.filter(text => text !== selectedSugg.value).join(' and ');
            setPrompt(updatedPrompt);
        }

        const updateSugg = suggestions.map((sug)=>
            sug.id == selectedSugg.id ? { ...sug, isSelected: !sug.isSelected }: sug
        )
        setSuggestions(updateSugg);
    }


    // Validation function
    const validateForm = () => {
        let valid = true;

        if (!website) {
            setWebsiteError(true);
            valid = false;
        } else {
            setWebsiteError(false);
        }

        if (!customerWebsite) {
            setCustomerWebsiteError(true);
            valid = false;
        } else {
            setCustomerWebsiteError(false);
        }

        if (!buyer) {
            setBuyerError(true);
            valid = false;
        } else {
            setBuyerError(false);
        }

        if(prompt.length == 0){
            setPromptError(true);
            valid = false;
        } else {
            setPromptError(false);
        }

        return valid;
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {            
            // startLoaderFunction(true);
            handlePitchFetchButton(true)
            let data = await fetchPitch(website, customerWebsite, buyer, prompt);
            // setTimeout(()=>{
            //     updateScriptData(`Subject Line: Unlock Peak Performance with Test\n\nDear [Buyer's Name],\n\nI hope this email finds you well.\n\nNoticed that your company is always seeking advancements in performance. Our product, Test, has been pivotal in helping many companies achieve significant improvements in efficiency.\n\nWith Test, you can streamline processes, boost productivity and make more informed decisions.\n\nI would love to discuss how Test can be the game-changer for your business. Can we set up a call at a time that suits you?\n\nLooking forward to your positive response.\n\nBest, \n[Your Name]`);
            // }, 3000);
            updateScriptData(data);
        } else {
            console.log('Form has validation errors');
        }
    };

    const handleReset = () =>{
        setBuyer('');
        setWebsite('');
        setCustomerWebsite('');
        setPrompt('');
        let resetSuggestion = suggestions.map((sugg, index)=>{
            return {...sugg, isSelected: false}
        })
        setSuggestions(resetSuggestion);
    }

    return (
        <Box sx={{width: '100%', display: 'block'}}>
            
            <TextField 
                id="outlined-basic"
                variant="outlined" 
                multiline
                rows={2.3}
                fullWidth
                sx={inputCss}
                margin="normal"
                placeholder="Enter your website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
            />
            {websiteError && (
                <Typography color="error" sx={{ textAlign: 'left', fontSize: '0.875em' }}>
                    Description is required.
                </Typography>
            )}
            <TextField 
                id="outlined-basic"
                variant="outlined" 
                multiline
                rows={2.3}
                fullWidth
                sx={inputCss}
                margin="normal"
                placeholder="Enter customer's website"
                value={customerWebsite}
                onChange={(e) => setCustomerWebsite(e.target.value)}
            />
            {customerWebsiteError && (
                <Typography color="error" sx={{ textAlign: 'left', fontSize: '0.875em' }}>
                    Customer is required.
                </Typography>
            )}
            <TextField 
                id="outlined-basic"
                variant="outlined" 
                multiline
                rows={2.3}
                fullWidth
                sx={inputCss}
                margin="normal"
                placeholder="Who is your buyer"
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
            />
            {buyerError && (
                <Typography color="error" sx={{ textAlign: 'left', fontSize: '0.875em' }}>
                    Title is required.
                </Typography>
            )}
            <Box sx={{display: 'flex', flexWrap: 'wrap', marginTop: '20px'}}>
                {
                    suggestions.map((sug, index)=>(
                        sug.isSelected ?
                            <Box key={index} sx={{...suggestionCss, backgroundColor: '#5271ff', color: '#fff', cursor: 'pointer'}} onClick={()=>{handleAvailableSuggestion(sug)}}>{ sug.text }</Box>
                        :
                            <Box key={index} sx={{...suggestionCss, cursor: 'pointer'}} onClick={()=>{handleAvailableSuggestion(sug)}}>{ sug.text }</Box>
                    ))
                }
                <Button sx={suggestionAddCss} onClick={handleAddPromptInput}>+ Add your own prompt</Button>
            </Box>
            {promptError && (
                <Typography color="error" sx={{ textAlign: 'left', fontSize: '0.875em' }}>
                    Please select an option.
                </Typography>
            )}
            {isAddPrompt && <Box sx={{textAlign: 'left'}}>
                <TextField 
                    id="outlined-basic"
                    variant="outlined" 
                    multiline
                    fullWidth
                    sx={inputCssAddPrompt}
                    margin="normal"
                    placeholder="Add prompt"
                    value={newSuggestionPrompt}
                    onChange={(e)=>{setNewSuggestionPrompt(e.target.value)}}
                />
                <Button sx={suggestionAddCss} disabled={newSuggestionPrompt == ''? true: false} onClick={handleAddPrompt}>Add prompt</Button>
            </Box>}
            <Box sx={{marginTop: '25px'}}>
                <Button sx={suggestionAddCss} onClick={handleSubmit}>Generate Pitch</Button>
                <Button sx={suggestionAddCss} onClick={handleReset}>Reset</Button>
            </Box>
        </Box>
    )
}