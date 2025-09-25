// Response database (expanded with more varieties and emojis)
const responses = {
    sad: [
        "I'm really sorry you're feeling sad right now. Remember, it's okay to have tough days. Here's a hug 🤗. What's one small thing that brings you joy?",
        "Sadness can be heavy, but you're carrying it with strength. Try this: List three things you're grateful for. Want to share one? 😊",
        "Feeling sad is part of being human. You're not alone! Maybe a warm cup of tea or a favorite memory can help. What's a happy memory for you? 🌟"
    ],
    stressed: [
        "Stress can feel overwhelming, but you've got this! Take a deep breath with me: In... Out... Better? What's one thing we can tackle together? 💪",
        "I see you're stressed—let's ease that. Prioritize one task at a time. What's the smallest step you can take right now? 😌",
        "Stressed out? You're doing amazing handling it all. How about a quick mindfulness break? Close your eyes for 5 seconds. Ready for more tips? 🌿"
    ],
    happy: [
        "Yay, happiness suits you! Celebrate the good vibes 🎉. What's making you smile today?",
        "I'm thrilled you're happy! Keep that energy going. What's one way you can spread this joy? 😄",
        "Your happiness is contagious! Share the highlight of your day with me 🌈."
    ],
    anxious: [
        "Anxiety can be tricky, but you're brave for facing it. Ground yourself: Name 5 things you see. Feel better? Let's talk more 🧡.",
        "Feeling anxious? Remember, this feeling will pass. What's one calming activity you enjoy, like breathing or walking? 🌼",
        "I hear your anxiety—sending calm vibes your way. Try focusing on the present. What's around you right now? 😊"
    ],
    motivated: [
        "Love that motivation! Ride that wave 🚀. What's your next goal?",
        "You're on fire with motivation! What's inspiring you today? Keep going! 🔥",
        "Motivated mode activated! Share your plan—I'm here to cheer you on 📣."
    ],
    default: [
        "Thanks for sharing! You're amazing just as you are. What's something positive from your day? 😊",
        "I'm here to support you. Tell me more about how you're feeling today 🌟.",
        "Every feeling is valid. Want a random positivity boost? Here's one: You're unique and valued! 💖"
    ]
};

// Daily tips
const dailyTips = [
    "Remember to drink water and stretch—your body thanks you! 💧",
    "Take 5 minutes for deep breathing to reset your mind. 😌",
    "Smile at yourself in the mirror—it's a mood booster! 😄",
    "Write down one goal for today and celebrate when you achieve it. 🎯",
    "Connect with a loved one—human connection lifts spirits. ❤️"
];

// DOM elements
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendMessageBtn = document.getElementById('send-message');
const resetChatBtn = document.getElementById('reset-chat');
const downloadChatBtn = document.getElementById('download-chat');
const dailyTipBtn = document.getElementById('daily-tip');
const moodBtns = document.querySelectorAll('.mood-btn');
const typingIndicator = document.createElement('div');
typingIndicator.id = 'typing-indicator';
typingIndicator.textContent = 'Bot is typing...';

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
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Add message to chat
function addMessage(sender, text) {
    chatHistory.push({ sender, text });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    displayChatHistory();
}

// Show typing indicator
function showTyping() {
    typingIndicator.style.display = 'block';
    chatWindow.appendChild(typingIndicator);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Hide typing indicator
function hideTyping() {
    typingIndicator.style.display = 'none';
    if (typingIndicator.parentNode) typingIndicator.parentNode.removeChild(typingIndicator);
}

// Get bot response
function getBotResponse(input) {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('sad')) return responses.sad[Math.floor(Math.random() * responses.sad.length)];
    if (lowerInput.includes('stressed') || lowerInput.includes('stress')) return responses.stressed[Math.floor(Math.random() * responses.stressed.length)];
    if (lowerInput.includes('happy') || lowerInput.includes('great')) return responses.happy[Math.floor(Math.random() * responses.happy.length)];
    if (lowerInput.includes('anxious') || lowerInput.includes('anxiety')) return responses.anxious[Math.floor(Math.random() * responses.anxious.length)];
    if (lowerInput.includes('motivated') || lowerInput.includes('motivation')) return responses.motivated[Math.floor(Math.random() * responses.motivated.length)];
    return responses.default[Math.floor(Math.random() * responses.default.length)];
}

// Handle sending message
function sendMessage(input = userInput.value.trim()) {
    if (input) {
        addMessage('user', input);
        userInput.value = '';
        showTyping();
        setTimeout(() => {
            hideTyping();
            const botResponse = getBotResponse(input);
            addMessage('bot', botResponse);
        }, 1500); // Increased delay for realism
    }
}

// Get daily tip
function getDailyTip() {
    const tip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    addMessage('bot', `Daily Tip: ${tip}`);
}

// Reset chat
function resetChat() {
    chatHistory = [];
    localStorage.removeItem('chatHistory');
    displayChatHistory();
    addMessage('bot', 'Welcome back! How are you feeling today? 😊');
}

// Download chat
function downloadChat() {
    const text = chatHistory.map(({ sender, text }) => `${sender.toUpperCase()}: ${text}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'motivational-chat.txt';
    link.click();
}

// Event listeners
sendMessageBtn.addEventListener('click', () => sendMessage());
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
resetChatBtn.addEventListener('click', resetChat);
downloadChatBtn.addEventListener('click', downloadChat);
dailyTipBtn.addEventListener('click', getDailyTip);
moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const mood = btn.dataset.mood;
        sendMessage(mood);
    });
});

// Initial welcome message
if (chatHistory.length === 0) {
    addMessage('bot', 'Hello! Welcome to Motivational Chatbot Pro. Share how you\'re feeling, or pick a quick mood option below. I\'m here to help! 🌟');
}

// Display initial history
displayChatHistory();
