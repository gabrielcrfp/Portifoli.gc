document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const textToType = "Inicializando_Protocolo_Gabriel.cassemiro.dev";
        let index = 0;
        function typeEffect() {
            if (index < textToType.length) {
                typingElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(typeEffect, 70);
            } else {
                typingElement.innerHTML += '<span class="cursor">|</span>';
            }
        }
        setTimeout(typeEffect, 500);
    }
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    const hackerBtn = document.getElementById('hacker-mode-toggle');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789gcassemiro<>/_[]";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let i = 0; i < columns; i++) { drops[i] = 1; }
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0f0";
        ctx.font = fontSize + "px arial";
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
            drops[i]++;
        }
    }
    let matrixInterval;
    let matrixRunning = false;
    function toggleMatrixMode() {
        if (!matrixRunning) {
            matrixInterval = setInterval(drawMatrix, 35);
            canvas.style.opacity = "0.5";
            hackerBtn.innerHTML = '<i class="fas fa-stop-circle"></i> Parar Imersão';
            matrixRunning = true;
        } else {
            clearInterval(matrixInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.opacity = "0.1";
            hackerBtn.innerHTML = '<i class="fas fa-terminal"></i> Executar Matrix.exe';
            matrixRunning = false;
        }
    }
    if (hackerBtn) { hackerBtn.addEventListener('click', toggleMatrixMode); }
});
