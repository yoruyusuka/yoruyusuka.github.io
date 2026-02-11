const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let drops = [];

for (let i = 0; i < 500; i++) {
    drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 4 + 4
    });
}
let stars = [];

for (let i = 0; i < 80; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.1 + 0.02
    });
}
// ===== Sterne zeichnen =====
for (let i = 0; i < stars.length; i++) {
    const s = stars[i];

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
    ctx.fill();

    // Twinkle Effekt
    s.alpha += (Math.random() - 0.5) * 0.02;
    s.alpha = Math.max(0.1, Math.min(1, s.alpha));

    // Langsame Bewegung
    s.y += s.speed;

    if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
    }
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;

    for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;

        if (d.y > canvas.height) {
            d.y = -20;
            d.x = Math.random() * canvas.width;
        }
    }

    requestAnimationFrame(drawRain);
}

drawRain();

const rainSound = document.getElementById("verstandSound");
const toggleBtn = document.getElementById("soundToggle");

let isPlaying = false;

toggleBtn.addEventListener("click", async () => {
    if (!isPlaying) {
        try {
            rainSound.volume = 0.4;
            await rainSound.play();
            toggleBtn.textContent = "🔊 Ambient On";
            isPlaying = true;
        } catch (err) {
            console.log("Playback blocked:", err);
        }
    } else {
        rainSound.pause();
        toggleBtn.textContent = "🔇 Ambient Off";
        isPlaying = false;
    }
});
