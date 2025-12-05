window.addEventListener("DOMContentLoaded", () => {

  const drops = [
    { id: "plate",  top: "300px" },
    { id: "layer3", top: "240px" },
    { id: "layer2", top: "180px" },
    { id: "layer1", top: "120px" },
    { id: "kitty",  top: "40px" },
    { id: "candle", top: "10px" }
  ];

  const message = document.getElementById("message");

  drops.forEach(d => {
    const el = document.getElementById(d.id);
    el.style.top = "-250px";
    el.style.position = "absolute";
  });

  drops.forEach((d, i) => {
    const el = document.getElementById(d.id);
    setTimeout(() => {
      el.style.transition = "top .8s ease";
      el.style.top = d.top;

      if (i === drops.length - 1) {
        setTimeout(() => {
          message.style.opacity = 1;
          startConfetti();
        }, 500);
      }
    }, i * 500);
  });

  // hearts same as before
  const heartsContainer = document.getElementById("hearts");
  function createHeart() {
    const heart = document.createElement("div");
    heart.textContent = "🩷";
    heart.style.position = "absolute";
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.top = `${window.innerHeight}px`;
    heartsContainer.appendChild(heart);

    let top = window.innerHeight;
    const anim = setInterval(() => {
      top -= 2;
      heart.style.top = top + "px";
      if (top < -50) {
        clearInterval(anim);
        heart.remove();
      }
    }, 20);
  }
  setInterval(createHeart, 300);

  // confetti
  function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dy: Math.random() * 3 + 2,
        dx: (Math.random() - 0.5) * 2,
        r: Math.random() * 6 + 2,
        color: `hsl(${Math.random() * 360},100%,50%)`
      });
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.y > canvas.height) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();
  }
});
