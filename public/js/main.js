//Module Imports
const {TestWriting} = require("gptObsidian/controllers/fileManagement.js")


// DOM Elements
const titleBox = document.querySelector('.title-box');
const mainTitle = document.querySelector('.main-title');
const modal = document.getElementById('myModal');

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
    animateTitleBox();
    handleResponsive();
    // Add window resize listener
    window.addEventListener('resize', handleResponsive);
    
    // Make modal functions globally available
    window.showModal = showModal;
    window.closeModal = closeModal;
}); 