// Response database
const responses = {
    sad: [
        "I'm so sorry you're feeling down. Here's a little sunshine: You're stronger than you know! What's one thing you love about yourself today?",
        "It's okay to feel sad sometimes. Try taking a deep breath and naming one thing you're grateful for. Want to share?",
        "Sending you a virtual hug! Maybe a small step, like listening to a favorite song, could lift your spirits. What's a song you love?"
    ],
    stressed: [
        "Ugh, stress can be tough. You're doing great just by being here! Try this: Close your eyes and breathe slowly for 10 seconds. Want a calming tip?",
        "Stress is like a heavy backpack—let's lighten it. What's one thing you can let go of today? I'm here to help!",
        "You're handling so much! How about a quick break with a funny video or a walk? What's stressing you out most right now?"
    ],
    happy: [
        "Yay, your happiness is contagious! What's making you smile today? Share the joy!",
        "Love that you're feeling happy! What's one thing you want to celebrate right now?",
        "Your positivity is lighting up this chat! What's a fun thing you want to do today?"
    ],
    default: [
        "Thanks for sharing! I'm here to lift you up. What's something small that made you smile recently?",
        "You're awesome for opening up! Want to tell me more about how you're feeling?",
        "I'm all ears (or rather, all text)! What's on your mind today?"
    ]
};

// DOM elements
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendMessageBtn = document.getElementById('send-message');
const resetChatBtn = document.getElementById('reset-chat');
const downloadChatBtn = document.getElementById('download-chat');

// Load chat history from localStorage
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

// Display chat history
function displayChatHistory() {
    chatWindow.innerHTML = '';
    chatHistory.forEach(({ sender, text }) => {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender}-message`;
        messageEl.textContent = text;
        chatWindow.appendChild(messageEl);
    });
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
}

// Add message to chat
function addMessage(sender, text) {
    chatHistory.push({ sender, text });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    displayChatHistory();
}

// Get bot response based on user input
function getBotResponse(input) {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('sad')) {
        return responses.sad[Math.floor(Math.random() * responses.sad.length)];
    } else if (lowerInput.includes('stressed') || lowerInput.includes('stress')) {
        return responses.stressed[Math.floor(Math.random() * responses.stressed.length)];
    } else if (lowerInput.includes('happy') || lowerInput.includes('great')) {
        return responses.happy[Math.floor(Math.random() * responses.happy.length)];
    } else {
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
}

// Handle sending message
function sendMessage() {
    const input = userInput.value.trim();
    if (input) {
        addMessage('user', input);
        const botResponse = getBotResponse(input);
        setTimeout(() => addMessage('bot', botResponse), 500); // Simulate typing delay
        userInput.value = '';
    }
}

// Reset chat
function resetChat() {
    chatHistory = [];
    localStorage.removeItem('chatHistory');
    displayChatHistory();
}

// Download chat as text
function downloadChat() {
    const text = chatHistory.map(({ sender, text }) => `${sender.toUpperCase()}: ${text}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat-history.txt';
    link.click();
}

// Event listeners
sendMessageBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
resetChatBtn.addEventListener('click', resetChat);
downloadChatBtn.addEventListener('click', downloadChat);

// Initial display
displayChatHistory();
