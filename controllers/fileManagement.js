const file = require('fs')
const filePath = require('path')
const { GenerateFile } = require("./gptEndPoint")

const folderPath = '/Users/fashton/Documents/OBSIDIAN'

function TestWriting(path,fileName,content){
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("file created")
}

module.export = {
    TestWriting
}

