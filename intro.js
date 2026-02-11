const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* ⭐ Normale Sterne */
let stars = [];

for (let i = 0; i < 120; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: Math.random() * 0.2 + 0.05
    });
}

/* 🌠 Sternschnuppen */
let shootingStars = [];

function createShootingStar() {
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 8 + 6,
        opacity: 1
    });
}

function drawStars() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Normale Sterne */
    for (let s of stars) {

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();

        s.alpha += (Math.random() - 0.5) * 0.02;
        s.alpha = Math.max(0.1, Math.min(1, s.alpha));

        s.y += s.speed;

        if (s.y > canvas.height) {
            s.y = 0;
            s.x = Math.random() * canvas.width;
        }
    }

    /* Sternschnuppen zeichnen */
    for (let i = 0; i < shootingStars.length; i++) {
        const s = shootingStars[i];

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y + s.length);
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        s.x += s.speed;
        s.y += s.speed;
        s.opacity -= 0.02;

        if (s.opacity <= 0) {
            shootingStars.splice(i, 1);
        }
    }

    /* Random Sternschnuppe */
    if (Math.random() < 0.01) {
        createShootingStar();
    }

    requestAnimationFrame(drawStars);
}

drawStars();

