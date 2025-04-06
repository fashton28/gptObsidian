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
                    content: `You are an avid note taker that will create different interconnected notes based on the following request ${request}:
                    1. Use ### for main titles
                    2. Use regular paragraphs for text
                    3. Use **text** for emphasis
                    4. ALWAYS use bullet points (- or *) to break down key points, examples, or steps
                    5. Use > for important quotes
                    6. Keep the formatting clean and consistent
                    7. Structure your response with:
                       - Key points in bullet points. use "-" for bullet points and put space in between each bullet point
                       - Examples or applications in bullet points
                    8. just answer in bullet points. No introductory sentences. JUST BULLETPOINTS 
                    `
                },
                {
                    role: "user",
                    content: transcript
                }
            ],
            model: "gpt-4",
            max_tokens: 200
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

module.exports = GenerateResponse;