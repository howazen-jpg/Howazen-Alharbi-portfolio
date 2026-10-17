/* خلفية متحركة بأسلوب البكسل لقسم الألعاب */
const canvas = document.getElementById('gameCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId = null;
  const colors = ['#5B2A6B','#8A4AA6','#A8355A','#C77FDB'];

  function resizeCanvas(){
    const hero = document.querySelector('.hero');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function initParticles(){
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 9000);
    for(let i=0; i<count; i++){
      particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: Math.random()*5 + 2,
        speedY: Math.random()*0.4 + 0.15,
        drift: (Math.random()-0.5)*0.3,
        color: colors[Math.floor(Math.random()*colors.length)],
        alpha: Math.random()*0.5 + 0.15,
        flicker: Math.random()*0.02 + 0.005
      });
    }
  }

  function drawFrame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.y -= p.speedY;
      p.x += p.drift;
      p.alpha += (Math.random()>0.5 ? p.flicker : -p.flicker);
      p.alpha = Math.max(0.1, Math.min(0.7, p.alpha));
      if(p.y < -10){ p.y = canvas.height + 10; p.x = Math.random()*canvas.width; }
      if(p.x < -10) p.x = canvas.width + 10;
      if(p.x > canvas.width+10) p.x = -10;
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    });
    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(drawFrame);
  }

  function startGameBg(){
    resizeCanvas();
    initParticles();
    if(!animId) drawFrame();
  }

  window.addEventListener('resize', ()=>{
    resizeCanvas();
    initParticles();
  });

  // تشغيل الأنيميشن تلقائياً
  startGameBg();
}