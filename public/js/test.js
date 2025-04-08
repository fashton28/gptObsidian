const { TestWriting } = require('../../controllers/fileManagement.js');

// Test parameters
const testFileName = 'test-note3.md';
const testContent = `# Test Note3

This is a test note created by the TestWriting function.

- Test bullet point 1
- Test bullet point 2

[[test-note]]`;

// Run the test
console.log('Starting test...');
TestWriting(testFileName, testContent);
console.log('Test completed. Check your Obsidian vault for the test note.'); 