const fs = require('fs')
const path = require('path')
const { GenerateFile } = require('./gptEndPoint')
const folderPath = '/Users/fashton/Documents/OBSIDIAN/TEST'

function TestWriting(fileName, content) {
    try {
        const filePath = path.join(folderPath, fileName);
        
        // Format content as markdown
        let contentString = '';
        if (typeof content === 'object') {
            // If content is an object, convert it to markdown format
            contentString = `# ${fileName.replace('.md', '')}\n\n${content}`;
        } else {
            // If content is already a string, use it as is
            contentString = content;
        }
        
        // Ensure the directory exists
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        
        fs.writeFileSync(filePath, contentString, 'utf8');
        console.log(`File created: ${fileName}`);
    } catch (error) {
        console.error(`Error writing file ${fileName}:`, error);
        throw error;
    }
}

async function CreateNoteFromGPT(req, res) {
    try {
        console.log('Request body:', req.body);
        const { topic } = req.body;
        
        if (!topic) {
            console.log('No topic provided');
            return res.status(400).json({ error: 'Topic is required' });
        }

        const gptRequest = {
            body: {
                request: topic
            }
        };

        const gptResponse = await GenerateFile(gptRequest, res);
        const parsedResponse = JSON.parse(gptResponse.answer);
        const createdFiles = [];
        
        for (const [key, value] of Object.entries(parsedResponse)) {
            const fileName = `${key.toLowerCase().replace(/\s+/g, '-')}.md`;
            TestWriting(fileName, value);
            createdFiles.push(fileName);
            console.log(`Created file: ${fileName}`);
        }
        
        res.status(200).json({
            success: true,
            files: createdFiles,
            content: parsedResponse
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
