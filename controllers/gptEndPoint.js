const OpenAI = require("openai");
const dotenv = require('dotenv');

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
});

const GenerateFile = async (req, res) => {
    try {
        const { request } = req.body;
        
        if (!transcript) {
            return res.status(400).json({
                error: 'Transcript is required'
            });
        }

        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Create a structured set of interconnected notes in valid JSON format based on the topic: ${request}.\n\nEach key in the JSON should be the title of a note. In the value (note content), any mention of another key (i.e., note title) should be wrapped in double square brackets to form Obsidian-style internal links — for example, [[Duke University]].\n\nThe content for each note should be in natural paragraph form (not a list), and contain multiple sentences of informative detail. If a note title refers to a place, person, or concept that appears in multiple notes, make sure it is always linked.\n\nReturn only the JSON object with no explanation or extra text. Make sure the JSON is valid.`
                },
                {
                    role: "user",
                    content: transcript
                }
            ],
            model: "gpt-4",
            max_tokens: 1000
        });

        res.status(200).json({
            answer: chatCompletion.choices[0].message.content
        });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({
            error: 'Failed to generate response',
            details: error.message
        });
    }
};

module.exports = GenerateFile;