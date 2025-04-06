// DOM Elements
const titleBox = document.querySelector('.title-box');
const mainTitle = document.querySelector('.main-title');

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
}); 