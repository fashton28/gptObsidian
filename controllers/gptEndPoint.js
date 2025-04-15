const OpenAI = require("openai");
const dotenv = require('dotenv');

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
});

const GenerateFile = async (req, res) => {
    try {
        const { request } = req.body;
        
        if (!request) {
            throw new Error('Request is required');
        }

        const systemPrompt = `You are an expert note generator that helps users learn by creating structured, interconnected notes from a given topic. Your goal is to generate a valid JSON object representing a Zettelkasten-style knowledge graph for Obsidian.

Using the following topic: ${request}

Please follow these rules:

1. Return only a valid JSON object. Do not include any text outside the JSON. Ensure brackets are closed properly.
2. Each key in the JSON should be a separate note title (in sentence case or title case).
3. Each value must be the content of that note, written in clear, atomic format (Zettelkasten style). Avoid combining unrelated ideas in one note.
4. Within each note's content:
   - Interlink related notes by wrapping any mention of another note title in double square brackets. For example: [[quantum-mechanics]] Make sure the links match with the titles.
   - Always use lowercase inside the [[ ]] for consistency with Obsidian linking
5. Notes should be as detailed and informative as possible. Each note must include:
   - A short summary paragraph
   - 5-8 bullet points of key ideas to remember for test preparation
6. Titles must be unique and reflect distinct subtopics of the input topic
7. Ensure all references to related topics exactly match the titles used in the JSON (case-insensitive match for [[ ]] usage)

Example format:
{
  "Photosynthesis": "Photosynthesis is the process by which plants convert sunlight into energy. It involves components such as [[chlorophyll]] and [[light-dependent reactions]].\\n\\n- Occurs in chloroplasts\\n- Converts CO2 + H2O into glucose and oxygen\\n- Involves two main stages: light-dependent and light-independent reactions",
  "Chlorophyll": "Chlorophyll is a green pigment responsible for absorbing light. It plays a central role in [[photosynthesis]] and is found in the thylakoid membranes of chloroplasts.\\n\\n- Absorbs blue and red light best\\n- Reflects green light (why plants appear green)"
}`;

        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: request
                }
            ],
            model: "gpt-4",
            max_tokens: 1000,
            temperature: 0.7
        });

        const response = chatCompletion.choices[0].message.content;
        
        // Try to parse the response to ensure it's valid JSON
        try {
            JSON.parse(response);
            return { answer: response };
        } catch (parseError) {
            console.error('Invalid JSON response:', response);
            throw new Error('Invalid JSON response from GPT');
        }
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
};

module.exports = {
    GenerateFile
};