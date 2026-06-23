document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("testimonialContainer");
  if (!container) return;

  // Rating stars
  function generateStars(rating = 5) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating
        ? `<i class="fa-solid fa-star"></i>`
        : `<i class="fa-regular fa-star"></i>`;
    }
    return stars;
  }

  try {
    const res = await fetch("https://zirconhome.onrender.com/api/testimonials");
    const data = await res.json();

    container.innerHTML = "";

    if (!data.length) {
      container.innerHTML = "<p>No testimonials available.</p>";
      return;
    }

    data.forEach((item, index) => {
      let delayClass = "";
      if (index % 3 === 1) delayClass = "delay1";
      if (index % 3 === 2) delayClass = "delay2";

  container.innerHTML += `
<div class="testimonial-card reveal ${delayClass}">
  
  <div class="top-section">
    <img 
      src="${item.image ? 'https://zirconhome.onrender.com' + item.image : 'images/default-user.png'}" 
      class="client-img"
    />

    <div class="top-content">
      <h3 class="client-name">${item.name}</h3>

      <p class="project-info">
        ${item.projectName ? item.projectName : ''}
        ${item.location ? (item.projectName ? ' | ' : '') + item.location : ''}
      </p>

      <div class="rating">${generateStars(item.rating)}</div>
    </div>
  </div>

  <p class="testimonial-text">
    "${item.message}"
  </p>

</div>
`;
    });

    // Card Scroll Reveal Animation
    const cards = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Array.from(cards).indexOf(entry.target);

        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("active");
          }, index * 250);
        } else {
          entry.target.classList.remove("active");
        }
      });
    }, { threshold: 0.3 });

    cards.forEach((card) => observer.observe(card));

  } catch (error) {
    container.innerHTML = "<p>Unable to load testimonials.</p>";
    console.error(error);
  }

/* Footer Animation & Logic */
const footer = document.querySelector(".footer");

if (footer) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add("show");
      } else {
        footer.classList.remove("show");
      }
    });
  }, { threshold: 0.2 });

  observer.observe(footer);
}

/* Heading text animation */
const headings = document.querySelectorAll(".heading-animate");

const headingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active"); // 👈 important
    }
  });
}, { threshold: 0.5 });

headings.forEach((el) => headingObserver.observe(el));

});

  // MOBILE MENU

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}