const canvas = document.getElementById('particles');

if(canvas){

  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createParticle(){

    return{
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,

      size: Math.random() * 5 + 1,

      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,

      life: Math.random() * 100,
      maxLife: 100 + Math.random() * 5000
    };

  }

  const particleCount =
    window.innerWidth < 900 ? 100 : 300;

  for(let i = 0; i < particleCount; i++){
    particles.push(createParticle());
  }

  function animateParticles(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,index) => {

      p.life++;

      let opacity = 1 - (p.life / p.maxLife);

      ctx.beginPath();

      ctx.arc(p.x,p.y,p.size,0,Math.PI * 2);

      ctx.fillStyle =
        `rgba(0,225,255,${opacity * 0.6})`;

      ctx.fill();

      p.y -= p.speedY;
      p.x += p.speedX;

      if(p.life >= p.maxLife){

        particles[index] = createParticle();

        particles[index].y = canvas.height + 20;

      }

    });

    requestAnimationFrame(animateParticles);

  }

  animateParticles();

}