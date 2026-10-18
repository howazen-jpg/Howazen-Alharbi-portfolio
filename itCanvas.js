/* خلفية متحركة بأسلوب الأمن السيبراني والشبكات لقسم التقنية */
const itCanvas = document.getElementById('itCanvas');
if (itCanvas) {
  const ctx = itCanvas.getContext('2d');
  let particles = [];
  let animId = null;

  // ألوان ذات طابع أمني وشبكي (Cyber / Security Palette)
  const colors = ['#00f3ff', '#0066ff', '#39ff14', '#7000ff', '#00d2ff'];
  
  // الرموز التقنية والأمنية التي ستطفو في الخلفية
  const techSymbols = ['🔒', '🛡️', '</>', '{ }', '1', '0', '⚡', '⚙️', '#'];

  function resizeCanvas() {
    const hero = document.querySelector('.hero');
    if (hero) {
      itCanvas.width = hero.offsetWidth;
      itCanvas.height = hero.offsetHeight;
    } else {
      itCanvas.width = window.innerWidth;
      itCanvas.height = window.innerHeight;
    }
  }

  function initParticles() {
    particles = [];
    // كثافة متوازنة للرموز
    const count = Math.floor((itCanvas.width * itCanvas.height) / 18000);
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * itCanvas.width,
        y: Math.random() * itCanvas.height,
        symbol: techSymbols[Math.floor(Math.random() * techSymbols.length)],
        fontSize: Math.floor(Math.random() * 10) + 12,
        speedY: Math.random() * 0.35 + 0.1,
        drift: (Math.random() - 0.5) * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.15,
        flicker: Math.random() * 0.015 + 0.005
      });
    }
  }

  function drawFrame() {
    ctx.clearRect(0, 0, itCanvas.width, itCanvas.height);

    // 1. رسم خطوط رفيعة بين الجسيمات القريبة (شبكة متصلة)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = (1 - distance / 110) * 0.15;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // 2. رسم الرموز والأقفال المتحركة
    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.drift;

      p.alpha += (Math.random() > 0.5 ? p.flicker : -p.flicker);
      p.alpha = Math.max(0.1, Math.min(0.65, p.alpha));

      if (p.y < -20) { p.y = itCanvas.height + 20; p.x = Math.random() * itCanvas.width; }
      if (p.x < -20) p.x = itCanvas.width + 20;
      if (p.x > itCanvas.width + 20) p.x = -20;

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.font = `${p.fontSize}px 'IBM Plex Mono', monospace`;
      ctx.fillText(p.symbol, Math.round(p.x), Math.round(p.y));
    });

    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(drawFrame);
  }

  function startItBg() {
    resizeCanvas();
    initParticles();
    if (animId) cancelAnimationFrame(animId);
    drawFrame();
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  startItBg();

  const themeToggleBtn = document.getElementById('theme-toggle');

// التحقق من تفضيل المستخدم المحفوظ مسبقاً
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'light') {
        themeToggleBtn.textContent = '🌙';
    }
}

// عند الضغط على الزر يتم تغيير الوضع وحفظه
themeToggleBtn.addEventListener('click', function () {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
    }
});
}