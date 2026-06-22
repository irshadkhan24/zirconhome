const container =
document.getElementById("projectsContainer");


// ================= LOAD PROJECTS =================

async function loadProjects() {

  try {

    const res = await fetch(
      "http://localhost:5000/api/ongoing"
    );

    const data = await res.json();

    const ongoingProjects =
      data.filter(
        p => p.status === "ongoing"
      );

    container.innerHTML = "";

    ongoingProjects.forEach((project, index) => {

      container.innerHTML += `

      <div class="project-card ${index % 2 !== 0 ? 'reverse' : ''}">

        <div class="project-image">

          <img 
          src="http://localhost:5000/uploads/${project.image}" 
          alt="project">

        </div>

        <div class="project-content">

          <h2>${project.title}</h2>

          <p>
          <span>Location:</span>
          ${project.location}
          </p>

          <p>
          <span>Details:</span>
          ${project.details}
          </p>

          <p>
          <span>Works:</span>
          ${project.works}
          </p>

          <p>
          <span>Cost:</span>
          ${project.cost}
          </p>

        </div>

      </div>

      `;

    });

    // IMPORTANT
    observeAnimations();

  } catch (err) {

    console.log(err);

  }

}

loadProjects();


// ================= CARD ANIMATION =================

function observeAnimations() {

  const cards =
  document.querySelectorAll(".project-card");

  const observer =
  new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

      } else {

        entry.target.classList.remove("show");

      }

    });

  }, {
    threshold: 0.2
  });

  cards.forEach(card => {

    observer.observe(card);

  });

}


// ================= FOOTER ANIMATION =================

const footer =
document.querySelector(".footer");

const footerObserver =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("show");

    } else {

      entry.target.classList.remove("show");

    }

  });

}, {
  threshold: 0.2
});

footerObserver.observe(footer);


// ================= BUTTON ANIMATION =================

const buttons =
document.querySelectorAll(
  ".load-more-container, .back-btn-container"
);

const btnObserver =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("show");

    } else {

      entry.target.classList.remove("show");

    }

  });

}, {
  threshold: 0.2
});

buttons.forEach(btn => {

  btnObserver.observe(btn);

});

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