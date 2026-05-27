const heroVideo = document.querySelector('.hero-video');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {

  const scrollY = window.scrollY;

  if(heroVideo){
    heroVideo.style.transform =
      `scale(1.15) translateY(${scrollY * 0.15}px)`;
  }

  if(heroContent){
    heroContent.style.transform =
      `translateY(${scrollY * 0.3}px)`;

    heroContent.style.opacity = 1 - scrollY / 700;
  }

});