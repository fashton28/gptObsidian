const fs = require('fs')
const path = require('path')
const { GenerateFile } = require('./gptEndPoint')
const folderPath = '/Users/fashton/Documents/OBSIDIAN/TEST'

function TestWriting(fileName, content, topicFolder) {
    try {
        // Create the path for the file inside the topic folder
        const filePath = path.join(folderPath, topicFolder, fileName);
        
        // Format content as markdown
        let contentString = '';
        if (typeof content === 'object') {
            // If content is an object, convert it to markdown format
            contentString = `# ${fileName.replace('.md', '')}\n\n${content}`;
        } else {
            // If content is already a string, use it as is
            contentString = content;
        }
        
        // Ensure the main directory exists
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        
        // Ensure the topic directory exists
        const topicDirPath = path.join(folderPath, topicFolder);
        if (!fs.existsSync(topicDirPath)) {
            fs.mkdirSync(topicDirPath, { recursive: true });
            console.log(`Topic directory created: ${topicFolder}`);
        }
        
        fs.writeFileSync(filePath, contentString, 'utf8');
        console.log(`File created: ${topicFolder}/${fileName}`);
        
        return path.join(topicFolder, fileName);
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
        
        // Create a folder name from the topic
        const topicFolder = topic.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').trim('-');
        
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
            const filePath = TestWriting(fileName, value, topicFolder);
            createdFiles.push(filePath);
        }
        
        res.status(200).json({
            success: true,
            folder: topicFolder,
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
