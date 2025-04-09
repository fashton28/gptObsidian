//Module Imports
// DOM Elements
console.log('Script loaded');
const titleBox = document.querySelector('.title-box');
const mainTitle = document.querySelector('.main-title');
const modal = document.getElementById('myModal');
const testButton = document.getElementById('gpttest');
console.log('Test button element:', testButton);
//Handlign the frontend
function animateTitleBox() {
    if (titleBox) {
        titleBox.addEventListener('mouseenter', () => {
            titleBox.style.transform = 'rotate(-6deg)';
        });
        
        titleBox.addEventListener('mouseleave', () => {
            titleBox.style.transform = 'rotate(-2deg)';
        });
    }
}


function closeModal() {
    modal.classList.add('hidden');
}

// Function to handle responsive behavior
function handleResponsive() {
    if (window.innerWidth < 768) {
        mainTitle.style.fontSize = '1.5rem';
    } else {
        mainTitle.style.fontSize = '1.875rem';
    }
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    animateTitleBox();
    handleResponsive();
    // Add window resize listener
    window.addEventListener('resize', handleResponsive);
    
    // Make modal functions globally available
    window.showModal = showModal;
    window.closeModal = closeModal;
});

// Add click event listener to test button
// testButton.addEventListener('click', async () => {
//     console.log('Button clicked');
//     try {
//         const response = await fetch('/create-note', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ 
//                 topic: "Create comprehensive notes on typescript" 
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         console.log('Note created:', data);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }); 

testButton.addEventListener('click', async () => {
    const spinner = document.getElementById('loadingScreen');
    try {
        spinner.classList.remove('hidden');
        const response = await fetch('http://localhost:3000/create-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic: 'Florida'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        spinner.classList.add('hidden');
    }
});






