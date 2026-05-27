const projects = document.querySelectorAll('.project');

function revealProjects(){

  const triggerBottom = window.innerHeight * 0.85;

  projects.forEach(project => {

    const rect = project.getBoundingClientRect();

    if(rect.top < triggerBottom){
      project.classList.add('show');
    }

  });

}

window.addEventListener('scroll', revealProjects);

revealProjects();