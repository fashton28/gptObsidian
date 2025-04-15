//Module Imports
// DOM Elements
console.log('Script loaded');
const titleBox = document.querySelector('.title-box');
const mainTitle = document.querySelector('.main-title');
const modal = document.getElementById('myModal');
const testButton = document.getElementById('gpttest');
const formButton = document.getElementById("submitForm");
const text = document.getElementById("requesting");
const form = document.getElementById("AskForm");
const loadingScreen = document.getElementById("loadingScreen");
const loadingBar = document.getElementById("loadingBar");
const progressPercent = document.getElementById("progressPercent");

function showModal() {
    modal.classList.remove('hidden');
}

//Handling the frontend
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

// Function to animate loading bar
function animateLoadingBar() {
    let width = 0;
    loadingBar.style.width = '0%';
    progressPercent.textContent = '0%';
    
    const interval = setInterval(() => {
        if (width >= 90) {
            clearInterval(interval);
        } else {
            width += Math.random() * 5;
            if (width > 90) width = 90;
            loadingBar.style.width = `${width}%`;
            progressPercent.textContent = `${Math.round(width)}%`;
        }
    }, 300);
    
    return {
        complete: () => {
            clearInterval(interval);
            width = 100;
            loadingBar.style.width = '100%';
            progressPercent.textContent = '100%';
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                loadingBar.style.width = '0%';
            }, 1000);
        },
        reset: () => {
            clearInterval(interval);
            loadingBar.style.width = '0%';
            progressPercent.textContent = '0%';
            loadingScreen.classList.add('hidden');
        }
    };
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

// Handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    if (!text.value) {
        alert('Please enter a topic');
        return;
    }
    
    loadingScreen.classList.remove('hidden');
    const loading = animateLoadingBar();
    
    try {
        const response = await fetch('/create-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic: text.value
            })
        });
        
        text.value = '';
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Success:', data);
        loading.complete();
        
        // Display success message
        alert('Notes successfully created!');
    } catch (error) {
        console.error('Error:', error);
        loading.reset();
        alert('Error creating notes: ' + error.message);
    }
});






