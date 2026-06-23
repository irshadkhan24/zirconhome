const API = "https://zirconhome.onrender.com/api/projects";

const projectsContainer =
document.getElementById("projectsContainer");

async function loadProjects(){

try{

const res = await fetch(API);

const data = await res.json();

projectsContainer.innerHTML = "";

if(data.length > 0){

document.querySelector(".projects-hero h1")
.innerText = data[0].heroTitle;

document.querySelector(".projects-hero p")
.innerText = data[0].heroDescription;

document.getElementById("complete-btn")
.innerText = data[0].completeBtn;

document.getElementById("ongoing-btn")
.innerText = data[0].ongoingBtn;

}

data.forEach(project => {

projectsContainer.innerHTML += `

<div class="project-paragraph animate">

<h3>${project.title}</h3>

<p>${project.description}</p>

</div>

`;

});

animateSections();

}catch(err){

console.log(err);

}

}

loadProjects();


// ANIMATION

function animateSections(){

const elements =
document.querySelectorAll('.animate, .project-paragraph');

const observer =
new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

}, { threshold: 0.1 });

elements.forEach(el => observer.observe(el));

}

 // MOBILE MENU

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// MOBILE DROPDOWN

document.querySelectorAll(".nav-links > li").forEach(item => {

  const dropdown = item.querySelector(".dropdown");

  if(dropdown){

    item.addEventListener("click", function(e){

      if(window.innerWidth <= 991){

        e.preventDefault();

        dropdown.classList.toggle("show-dropdown");

      }

    });

  }

});

// Dropdown links open hone dena

document.querySelectorAll(".dropdown a").forEach(link => {

  link.addEventListener("click", function(e){

    e.stopPropagation();

  });

});