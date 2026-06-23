const API =
"https://zirconhome.onrender.com/api/services";

document.addEventListener(
"DOMContentLoaded",
() => {

  loadServices();

});



async function loadServices() {

  try {

    const res =
    await fetch(API);

    const data =
    await res.json();

    console.log(data);

    if (!data) return;



    // HERO

    document.getElementById("heroTitle")
    .innerText =
    data.heroTitle || "";

    document.getElementById("heroSubtitle")
    .innerText =
    data.heroSubtitle || "";



    // INTRO

    document.getElementById("introTitle")
    .innerText =
    data.introTitle || "";

    document.getElementById("introDescription")
    .innerText =
    data.introDescription || "";



    // SERVICES

    const servicesGrid =
    document.getElementById("servicesGrid");

    servicesGrid.innerHTML = "";

    data.services.forEach(
    (service, index) => {

      servicesGrid.innerHTML += `

<a href="${service.link}"
class="service-card ${index % 2 === 0 ? "animate-left" : "animate-right"}">

<i class="${service.icon}"></i>

<h3>
${service.title}
</h3>

<p>
${service.description}
</p>

<span class="service-btn">
${service.buttonText}
</span>

</a>

`;

    });



    // WHY CHOOSE

    const whyGrid =
    document.getElementById("whyGrid");

    whyGrid.innerHTML = "";

    data.whyChoose.forEach(item => {

      whyGrid.innerHTML += `

<div class="why-box animate">

${item}

</div>

`;

    });



    // ANIMATION

    const boxes =
    document.querySelectorAll(
    '.animate, .service-card, .footer, .why-box'
    );

    const observer =
    new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

        }

      });

    }, {
      threshold: 0.3
    });

    boxes.forEach(el =>
      observer.observe(el)
    );

  } catch (err) {

    console.log(err);

  }

}

 // MOBILE MENU

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}