// DOM elements
const baseSelect = document.getElementById('base-select');
const hatSelect = document.getElementById('hat-select');
const hatColor = document.getElementById('hat-color');
const shirtSelect = document.getElementById('shirt-select');
const shirtColor = document.getElementById('shirt-color');
const pantsSelect = document.getElementById('pants-select');
const pantsColor = document.getElementById('pants-color');
const updatePreviewBtn = document.getElementById('update-preview');
const downloadPngBtn = document.getElementById('download-png');
const canvas = document.getElementById('character-canvas');
const ctx = canvas.getContext('2d');

// Function to draw the character
function drawCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw base animal (simple shapes)
    const base = baseSelect.value;
    ctx.fillStyle = '#8b4513'; // Brown for bear/cat body
    if (base === 'bear') {
        // Bear body
        ctx.beginPath();
        ctx.ellipse(150, 200, 100, 150, 0, 0, 2 * Math.PI); // Body
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(150, 80, 60, 60, 0, 0, 2 * Math.PI); // Head
        ctx.fill();
        // Ears
        ctx.beginPath();
        ctx.ellipse(100, 40, 20, 30, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(200, 40, 20, 30, 0, 0, 2 * Math.PI);
        ctx.fill();
    } else if (base === 'cat') {
        // Cat body
        ctx.beginPath();
        ctx.ellipse(150, 200, 80, 120, 0, 0, 2 * Math.PI); // Body
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(150, 80, 50, 50, 0, 0, 2 * Math.PI); // Head
        ctx.fill();
        // Ears
        ctx.beginPath();
        ctx.moveTo(120, 40);
        ctx.lineTo(130, 10);
        ctx.lineTo(140, 40);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(160, 40);
        ctx.lineTo(170, 10);
        ctx.lineTo(180, 40);
        ctx.fill();
    }

    // Draw outfits with selected colors
    const hat = hatSelect.value;
    if (hat !== 'none') {
        ctx.fillStyle = hatColor.value;
        if (hat === 'top-hat') {
            ctx.fillRect(100, 20, 100, 40); // Top hat
        } else if (hat === 'baseball-cap') {
            ctx.beginPath();
            ctx.arc(150, 60, 50, 0, Math.PI, true); // Cap
            ctx.fill();
        }
    }

    const shirt = shirtSelect.value;
    if (shirt !== 'none') {
        ctx.fillStyle = shirtColor.value;
        if (shirt === 't-shirt') {
            ctx.fillRect(100, 120, 100, 100); // T-shirt
        } else if (shirt === 'jacket') {
            ctx.fillRect(90, 120, 120, 100); // Jacket
        }
    }

    const pants = pantsSelect.value;
    if (pants !== 'none') {
        ctx.fillStyle = pantsColor.value;
        if (pants === 'shorts') {
            ctx.fillRect(120, 280, 60, 40); // Shorts
        } else if (pants === 'jeans') {
            ctx.fillRect(110, 280, 80, 80); // Jeans
        }
    }

    // Simple eyes and mouth for personality
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(130, 70, 5, 5, 0, 0, 2 * Math.PI); // Left eye
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(170, 70, 5, 5, 0, 0, 2 * Math.PI); // Right eye
    ctx.fill();
    ctx.beginPath();
    ctx.arc(150, 90, 10, 0, Math.PI, false); // Mouth
    ctx.stroke();
}

// Download as PNG
function downloadPng() {
    const link = document.createElement('a');
    link.download = 'my-character.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Event listeners
updatePreviewBtn.addEventListener('click', drawCharacter);
downloadPngBtn.addEventListener('click', downloadPng);

// Initial draw
drawCharacter();
