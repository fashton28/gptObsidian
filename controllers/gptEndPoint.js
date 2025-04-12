const OpenAI = require("openai");
const dotenv = require('dotenv');

dotenv.config()

const openai = new OpenAI({
    apiKey: ""
});

const GenerateFile = async (req, res) => {
    try {
        const { request } = req.body;
        
        if (!request) {
            throw new Error('Request is required');
        }

        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Create a structured set of interconnected notes based on the topic. MAKE SURE TO SEND THE RESPONSE IN JSON FILE and MAKE SURE TO CLOSOE BRACKETS PROPERLY: ${request}.\n\nEach key in the JSON should be the title of a note. In the value (note content), any mention of another key (i.e., note title) should be wrapped in double square brackets to form Obsidian-style internal links — for example, [[Duke University]].\n\nThe content for each note should be in Zettelkasten (atomic notes) form (THIS IS REALLY IMPORRTANT). If a note title refers to a place, person, or concept that appears in multiple notes, make sure it is always linked in lower case.\n\nReturn only the JSON object with no explanation or extra text. Make sure the JSON is valid. enumerate each topic and make sure that the inteconnected text matches the titles. Each set of notes should be as detailed as possible, including main bullet points to remember for the test per topic.`
                },
                {
                    role: "user",
                    content: request
                }
            ],
            model: "gpt-4",
            max_tokens: 2000    
        });

        return {
            answer: chatCompletion.choices[0].message.content
        };
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
};

module.exports = {
    GenerateFile
};