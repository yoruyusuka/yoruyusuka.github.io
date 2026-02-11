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

/* Lightning */
function lightning() {
    const flash = document.createElement("div");
    flash.classList.add("flash");
    document.body.appendChild(flash);

    flash.style.opacity = 0.8;

    setTimeout(() => {
        flash.style.opacity = 0;
        document.body.removeChild(flash);
    }, 150);
}

setInterval(() => {
    if (Math.random() > 0.85) {
        lightning();
    }
}, 3000);

const rainSound = document.getElementById("sadboySound");
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
