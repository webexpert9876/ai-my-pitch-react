export const fetchPitch = async (description, customer, title, type) => {

    const requestData = {
        "model": "gpt-4",
        "messages": [
            {
                "role": "user",
                "content": `
                            Write a short, concise sales email outreach. 

                            - Keep the text body between 50 and 125 words.
                            - The subject line should be 4 to 7 words and catchy but relevant.
                            - The email should include:
                            - A personalized opening or reason for outreach.
                            - A value proposition in one to two sentences.
                            - A clear and simple call-to-action.

                            You are representing: ${description}
                            Your customer is: ${customer}
                            Your buyer on the customer side is: ${title}
                            Please ${type} too

                            Please ensure the email is within the specified word limit.
                `
            }
        ],

    };

    try {
        // Start fetching data from the API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ process.env.REACT_APP_CHATGPT_API_KEY }`
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}