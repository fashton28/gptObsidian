const express = require('express');
const path = require('path');
const { CreateNoteFromGPT } = require('./controllers/fileManagement');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory with proper MIME types
app.use(express.static(path.join(__dirname, "public")))

// Set up the main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create note from GPT endpoint
app.post('/create-note', CreateNoteFromGPT);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 