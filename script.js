document.addEventListener("DOMContentLoaded", function () {
    startBalloons();
    startConfetti(); 
    // Reveal the photo frame after 3.5 seconds
    setTimeout(() => {
    const surprise = document.getElementById("photoSurprise");
    if (surprise) surprise.classList.remove("hidden");
  }, 3500);
  // Optional: Auto-start confetti
  });
  
  // Confetti function
  function startConfetti() {
    const confettiCanvas = document.getElementById('confetti');
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  
    const confetti = [];
    const colors = ['#fceabb', '#f8d98c', '#fcd581', '#f4a6b5', '#e0bbf9', '#ffb3c6'];
  
    function createConfettiPiece() {
      const shapes = ['strip', 'glitter', 'star', 'heart'];
      return {
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 1,
        rotate: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      };
    }
  
    for (let i = 0; i < 250; i++) {
      confetti.push(createConfettiPiece());
    }
  
    function drawHeart(ctx, size) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -size / 2, -size, -size / 2, -size, 0);
      ctx.bezierCurveTo(-size, size, 0, size, 0, size * 1.5);
      ctx.bezierCurveTo(0, size, size, size, size, 0);
      ctx.bezierCurveTo(size, -size / 2, 0, -size / 2, 0, 0);
      ctx.closePath();
      ctx.fill();
    }
  
    function drawStar(ctx, r) {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          Math.cos((18 + i * 72) * Math.PI / 180) * r,
          -Math.sin((18 + i * 72) * Math.PI / 180) * r
        );
        ctx.lineTo(
          Math.cos((54 + i * 72) * Math.PI / 180) * (r / 2),
          -Math.sin((54 + i * 72) * Math.PI / 180) * (r / 2)
        );
      }
      ctx.closePath();
      ctx.fill();
    }
  
    function animateConfetti() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      confetti.forEach(piece => {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotate * Math.PI) / 180);
        ctx.fillStyle = piece.color;
  
        switch (piece.shape) {
          case "strip":
            ctx.fillRect(-piece.size / 4, -piece.size / 2, piece.size / 2, piece.size);
            break;
          case "glitter":
            ctx.beginPath();
            ctx.arc(0, 0, piece.size / 2.5, 0, Math.PI * 2);
            ctx.shadowBlur = 8;
            ctx.shadowColor = piece.color;
            ctx.fill();
            break;
          case "star":
            drawStar(ctx, piece.size / 2);
            break;
          case "heart":
            drawHeart(ctx, piece.size / 3);
            break;
        }
  
        ctx.restore();
        piece.y += piece.speed;
        piece.rotate += 1.5;
  
        if (piece.y > confettiCanvas.height) {
          Object.assign(piece, createConfettiPiece(), { y: -10 });
        }
      });
  
      requestAnimationFrame(animateConfetti);
    }
  
    animateConfetti();
  }
  
  // Balloon function
  function startBalloons() {
    const canvas = document.getElementById("balloonCanvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const balloonColors = ['#f4a6b5', '#fcd581', '#e0bbf9', '#ffb3c6', '#f8d98c'];
    const balloons = [];
  
    function createBalloon() {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        r: Math.random() * 30 + 30,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        speed: Math.random() * 1.2 + 0.5,
        sway: Math.random() * 0.05 + 0.02,
        angle: Math.random() * Math.PI * 2
      };
    }
  
    for (let i = 0; i < 25; i++) {
      balloons.push(createBalloon());
    }
  
    function animateBalloons() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      balloons.forEach(balloon => {
        balloon.y -= balloon.speed;
        balloon.angle += balloon.sway;
        const swayX = Math.sin(balloon.angle) * 10;
  
        // Balloon body
        ctx.beginPath();
        ctx.ellipse(balloon.x + swayX, balloon.y, balloon.r * 0.6, balloon.r, 0, 0, Math.PI * 2);
        ctx.fillStyle = balloon.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = balloon.color;
        ctx.fill();
  
        // String
        ctx.beginPath();
        ctx.moveTo(balloon.x + swayX, balloon.y + balloon.r);
        ctx.lineTo(balloon.x + swayX, balloon.y + balloon.r + 40);
        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 1;
        ctx.stroke();
  
        // Reset if balloon goes out of view
        if (balloon.y + balloon.r < 0) {
          Object.assign(balloon, createBalloon());
          balloon.y = canvas.height + 50;
        }
      });
  
      requestAnimationFrame(animateBalloons);
    }
  
    animateBalloons();
  }
  function toggleCandle() {
    const cake = document.getElementById('cakeImg');
    cake.src = cake.src.includes('lit.png') ? 'unlit.png' : 'lit.png';
  }
  