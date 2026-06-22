// ================= SCROLL ANIMATION =================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show"); // remove if scroll back up
    }
  });
}, {
  threshold: 0.2
});

// Observe headings, paragraphs, left, right, location, address, map
const elements = document.querySelectorAll(
  ".contact-section h2, .contact-section p, .contact-left, .contact-right, .location-heading, .map-address-card, .map-container"
);

elements.forEach(el => observer.observe(el));



// ================= FORM SUBMIT =================

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function() {
    setTimeout(() => {
      alert("Inquiry Sent Successfully!");
      form.reset();
    }, 500);
  });
}


// ================= INPUT FOCUS EFFECT =================
const inputs = document.querySelectorAll("input, textarea");

inputs.forEach(input => {
  input.addEventListener("focus", () => {
    input.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", () => {
    input.style.transform = "scale(1)";
  });
});

// ================= MAP BUTTON SCROLL ANIMATION =================
const mapContainer = document.querySelector('.map-container');

const mapObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

mapObserver.observe(mapContainer);

// Footer Animation
const footer = document.querySelector('.footer');

const footerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // optional, scroll back up
    }
  });
}, { threshold: 0.2 });

footerObserver.observe(footer);
footerObserver.observe(footer);


// ================= DYNAMIC CONTACT DATA LOAD =================
async function loadContactData() {
  try {
    const res = await fetch("http://localhost:5000/api/contact");
    const data = await res.json();

    if (!data.length) return;

    const c = data[0]; // latest record

    // Heading
    document.querySelector(".contact-section h2").innerText =
      c.heading || "Get In Touch With Us";

    document.querySelector(".contact-section p").innerText =
      c.subheading || "";

    // Company Name
   document.querySelector(".contact-left h3").innerText =
  c.title ||  "";

    // Address
    document.querySelector(".address-text").innerHTML = `
      <strong>${c.companyName}</strong>
      <span>${c.address}</span>
    `;

    // Phone
    document.querySelector(".fa-phone-volume").parentNode.innerHTML =
      `<i class="fas fa-phone-volume"></i> ${c.phone}`;

    // Email
    document.querySelector(".fa-envelope-open-text").parentNode.innerHTML =
      `<i class="fas fa-envelope-open-text"></i> ${c.email}`;

    // Timing
    document.querySelector(".fa-business-time").parentNode.innerHTML =
      `<i class="fas fa-business-time"></i> ${c.timing}`;

    // Call button
    document.querySelector(".call-btn").href = `tel:${c.phone}`;

    // WhatsApp button
    document.querySelector(".whatsapp-btn").href =
      `https://wa.me/${c.whatsapp}`;

    // Map
    if (c.mapLink) {
      document.querySelector(".map-container iframe").src = c.mapLink;
    }

    // Short location
    document.querySelector(".map-address-card").innerHTML =
      `<i class="fas fa-location-dot"></i> ${c.address}`;

  } catch (err) {
    console.log("Error loading contact:", err);
  }
}

// CALL FUNCTION
loadContactData();

 // MOBILE MENU

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}