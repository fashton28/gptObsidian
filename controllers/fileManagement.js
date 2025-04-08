const fs = require('fs')
const path = require('path')
const { GenerateFile } = require("./gptEndPoint")

const folderPath = '/Users/fashton/Documents/OBSIDIAN/TEST'

function TestWriting(fileName, content){
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("file created")
}

module.exports = {
    TestWriting
}

