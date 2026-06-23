const container =
document.getElementById("projectsContainer");


// ================= LOAD PROJECTS =================

async function loadProjects() {

  try {

    const res = await fetch(
      "https://zirconhome.onrender.com/api/complete"
    );

    const data = await res.json();

    console.log(data);

    const completedProjects =
      data.filter(
        p => p.status === "completed"
      );

    // CLEAR OLD STATIC DATA
    container.innerHTML = "";

    completedProjects.forEach((project, index) => {

      container.innerHTML += `

      <div class="project-card ${index % 2 !== 0 ? 'reverse' : ''}">

        <div class="project-image">

          <img 
          src="http:https://zirconhome.onrender.com/uploads/${project.image}" 
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

    observeAnimations();
    setupViewMore();

  } catch (err) {

    console.log("ERROR:", err);

  }

}

loadProjects();

let visibleProjects = 2;

function setupViewMore() {

  const cards =
    document.querySelectorAll(".project-card");

  const btn =
    document.getElementById("load-more-btn");

  // hide all after 2
  cards.forEach((card, index) => {

    if (index >= visibleProjects) {

      card.style.display = "none";

    }

  });

  btn.addEventListener("click", () => {

    let hidden =
      [...cards].filter(
        card => card.style.display === "none"
      );

    hidden.slice(0, 2).forEach(card => {

      card.style.display = "flex";

      setTimeout(() => {
        card.classList.add("show");
      }, 100);

    });

    // hide button if no more
    if (
      [...cards].every(
        card => card.style.display !== "none"
      )
    ) {

      btn.style.display = "none";

    }

  });

}


// ================= ANIMATION =================
function observeAnimations() {

  const cards =
    document.querySelectorAll(".project-card");

  const observer =
    new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

        } else {

          // REMOVE WHEN OUT OF SCREEN
          entry.target.classList.remove("show");

        }

      });

    }, { threshold: 0.2 });

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

      footer.classList.add("show");

    } else {

      footer.classList.remove("show");

    }

  });

}, { threshold: 0.2 });

footerObserver.observe(footer);

// ================= MAP BUTTON ANIMATION =================

const mapContainer =
document.querySelector(".map-container");

const mapObserver =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      mapContainer.classList.add("show");

    } else {

      mapContainer.classList.remove("show");

    }

  });

}, { threshold: 0.3 });

mapObserver.observe(mapContainer);

// ================= BUTTON ANIMATION =================

const buttons =
document.querySelectorAll(".reveal-btn");

const buttonObserver =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("show");

    } else {

      entry.target.classList.remove("show");

    }

  });

}, { threshold: 0.3 });

buttons.forEach(btn => {

  buttonObserver.observe(btn);

});

 // MOBILE MENU

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

const textSections = document.querySelectorAll(
  ".testimonial-preview, .cta, .map-section"
);

const textObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }

  });

}, { threshold: 0.3 });

textSections.forEach(section => {
  textObserver.observe(section);
});


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