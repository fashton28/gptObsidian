const fs = require('fs')
const path = require('path')
const { GenerateFile } = require('./gptEndPoint')
const folderPath = '/Users/fashton/Documents/OBSIDIAN/TEST'

function TestWriting(fileName, content) {
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("file created")
}

async function CreateNoteFromGPT(req, res) {
    try {
        console.log('Request body:', req.body); // Debug log
        const { topic } = req.body;
        
        if (!topic) {
            console.log('No topic provided'); // Debug log
            return res.status(400).json({ error: 'Topic is required' });
        }

        // Create a mock request object for GenerateFile
        const gptRequest = {
            body: {
                request: topic
            }
        };

        // Get GPT response
        const gptResponse = await GenerateFile(gptRequest, res);
        
        // Create a filename from the topic
        const fileName = `${topic.toLowerCase().replace(/\s+/g, '-')}.md`;
        
        // Write the GPT response to a file
        TestWriting(fileName, gptResponse.answer);
        
        res.status(200).json({
            success: true,
            fileName: fileName,
            content: gptResponse.answer
        });
    } catch (error) {
        console.error('Error in CreateNoteFromGPT:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    TestWriting,
    CreateNoteFromGPT
}
