document.addEventListener("DOMContentLoaded", function () {
  // 1. NAVBAR ACTIVE HANDLING 
  const allLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  allLinks.forEach(link => {
    link.addEventListener("click", function () {
      allLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  function onScrollActivate() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        const id = section.getAttribute("id");

        if (id) {
          allLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      }
    });
  }

  window.addEventListener("scroll", onScrollActivate);

  // 2. ABOUT SECTION SCROLL 
 const aboutText = document.querySelector(".about-text");
const aboutImage = document.querySelector(".about-image");

if (aboutText && aboutImage) {
  const observerAbout = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      aboutText.classList.toggle("animate", entry.isIntersecting);
      aboutImage.classList.toggle("animate", entry.isIntersecting);
    });
  }, { threshold: 0.25 });

  observerAbout.observe(aboutText);
}

  // ABOUT IMAGE AUTO SLIDER 
 // ABOUT IMAGE AUTO SLIDER
const slides = document.querySelectorAll(".about-slider .slide");

if (slides.length > 0) {

  let current = 0;

  function changeSlide() {
    slides[current].classList.remove("active");

    current = (current + 1) % slides.length;

    slides[current].classList.add("active");
  }

  setInterval(changeSlide, 4000);
}

  // 3. MISSION & VISION 
  const mvBoxes = document.querySelectorAll(".mv-box");
  const observerMV = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  }, { threshold: 0.3 });
  mvBoxes.forEach(box => observerMV.observe(box));

  // 4. COMPANY STATS SCROLL FADE 
 const statsSection = document.querySelector(".company-stats");

if (statsSection) {

  const statsObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        document.querySelectorAll(".stat-box").forEach(box => {
          box.classList.add("animate");
        });

        animateStats();

      } else {

        document.querySelectorAll(".stat-box").forEach(box => {
          box.classList.remove("animate");
        });

      }

    });

  }, {
    threshold: 0.4
  });

  statsObserver.observe(statsSection);
}

  // 5. COMPANY STATS CIRCLE + COUNT 
  // ================= STATS ANIMATION =================
function animateStats() {

  const circles = document.querySelectorAll(".circle");

  circles.forEach(circle => {

    const progress = circle.querySelector(".progress");
    const number = circle.querySelector(".number");

    const percent = parseInt(circle.getAttribute("data-percent")) || 0;
    const countTo = parseInt(circle.getAttribute("data-count")) || 0;

    // Reset
    progress.style.strokeDashoffset = 314;
    number.innerText = "0+";

    let count = 0;
    const offset = 314 - (314 * percent) / 100;

    // Circle fill animation
    setTimeout(() => {
      progress.style.strokeDashoffset = offset;
    }, 100);

    const duration = 1800; // same as circle transition
    const stepTime = duration / countTo;

    const counter = setInterval(() => {

      count++;

      number.innerText = count + "+";

      if (count >= countTo) {
        clearInterval(counter);
      }

    }, stepTime);

  });

}

  // 6. WHY CHOOSE SCROLL ANIMATION 
  const whyBoxes = document.querySelectorAll(".why-box");
  const observerWhy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  }, { threshold: 0.25 });
  whyBoxes.forEach(box => observerWhy.observe(box));

  // 7. CERTIFICATION SCROLL ANIMATION 
  const certBoxes = document.querySelectorAll(".cert-box");
  if (certBoxes.length > 0) {
    const observerCert = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("animate", entry.isIntersecting);
      });
    }, { threshold: 0.25 });
    certBoxes.forEach(box => observerCert.observe(box));
  }

  // For Map 
  const map = document.querySelector(".map-container");
  if (map) {
    const observerMap = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        map.classList.toggle("animate", entry.isIntersecting);
      });
    }, { threshold: 0.3 });
    observerMap.observe(map);
  }

  // Left Right & Center All Header & Pragraph Animation
  const animatedElements = document.querySelectorAll(
    ".animate-left, .animate-right, .animate-center"
  );
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(entries => {
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
    animatedElements.forEach(el => observer.observe(el));
  }

  // Footer ANimation 
  const footer = document.querySelector('.footer');
  if (footer) {
    const footerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, { threshold: 0.2 });
    footerObserver.observe(footer);
  }

  async function loadAboutData() {
  const res = await fetch("http://localhost:5000/api/about");
  const data = await res.json();

   console.log("ADMIN DATA 👉", data);

  // ================= ABOUT =================
  const aboutData = data.filter(d => d.section === "about");

const aboutContainer = document.getElementById("aboutContainer");
const aboutImage = document.querySelector(".about-image");

if (aboutData.length) {
  const item = aboutData[0]; // ONLY FIRST ITEM

  // TEXT SIDE
aboutContainer.innerHTML = `
  <h3 class="animate-center">ABOUT</h3>

  <h1 class="animate-right">
    ${item.title || ""}
  </h1>

  ${item.description
    .split("\n")
    .map(line => `<p class="animate-left">${line}</p>`)
    .join("")}
`;
const aboutElements = aboutContainer.querySelectorAll(
  ".animate-left, .animate-right, .animate-center"
);

const aboutObserver = new IntersectionObserver(entries => {
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

aboutElements.forEach(el => {
  aboutObserver.observe(el);
});

  // IMAGE SIDE
  if (item.image) {
   const img = aboutImage.querySelector("img");
if (img && item.image) {
  img.src = "http://localhost:5000" + item.image;
}
  }
}

  // ================= MISSION =================
 const missionData = data.filter(d => d.section === "mission");

const mvBoxes = document.querySelectorAll(".mv-box");

mvBoxes.forEach((box, i) => {
  if (missionData[i]) {
    box.querySelector("h3").innerText = missionData[i].title;
    box.querySelector("p").innerText = missionData[i].description;
  }
});

  // ================= STATS =================
// ================= STATS =================
// ================= STATS =================

const statsItem = data.find(d => d.section === "stats");

if (statsItem && statsItem.stats) {

  const statBoxes = document.querySelectorAll(".stat-box");

  statBoxes.forEach((box, i) => {

    const stat = statsItem.stats[i];

    if (stat) {

      const circle = box.querySelector(".circle");

      const progress = circle.querySelector(".progress");

      const number = circle.querySelector(".number");

      const value = parseInt(stat.value) || 0;

      // TITLE

      box.querySelector("p").innerText = stat.title;

      // DATA UPDATE

      circle.setAttribute("data-count", value);

      circle.setAttribute("data-percent", value);

      // NUMBER

      number.innerText = value + "+";

      // CIRCLE PROGRESS

      const offset = 314 - (314 * value) / 100;

      progress.style.strokeDashoffset = offset;

    }

  });

}

  // ================= WHY =================
// ================= WHY =================
const whyContainer = document.querySelector(".why-grid");
whyContainer.innerHTML = "";

data
  .filter(d => d.section === "why")
  .forEach(item => {
   whyContainer.innerHTML += `
  <div class="why-box show">
        <i class="${item.icon || 'fas fa-star'}"></i>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
  });

  // ================= CERT =================
  // ================= CERT =================
const certContainer = document.querySelector(".cert-grid");

if (certContainer) {
  certContainer.innerHTML = "";

  const certData = data.filter(d => d.section === "certification");

  console.log("CERT DATA 👉", certData); // DEBUG

 certData.forEach(item => {
  certContainer.innerHTML += `
    <a href="${item.image ? 'http://localhost:5000' + item.image : '#'}" 
       target="_blank" 
       class="cert-box">

      <div class="cert-icon">
        <i class="${item.icon || 'fas fa-certificate'}"></i>
      </div>

      <h3>${item.title}</h3>
      <p>${item.description}</p>

    </a>
  `;
});
// 🔥 FORCE SHOW (warna hidden rahenge)
setTimeout(() => {
  document.querySelectorAll(".cert-box").forEach(el => {
    el.classList.add("animate");
  });
}, 200);
}
  // ================= OFFICE =================
  const office = data.find(d => d.section === "office");

  if (office) {
    document.querySelector(".map-address-card").innerText =
      office.description;
  }
}
loadAboutData();

setTimeout(() => {
  document.querySelectorAll(".why-box, .mv-box, .cert-box").forEach(el => {
    el.classList.add("show");
  });
}, 200);
});



  // MOBILE MENU

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}