const api =
"https://zirconhome.onrender.com/api/electricalplumbing";

const container =
document.getElementById(
    "electricalplumbingsContainer"
);


// ==========================
// LOAD SERVICES
// ==========================
async function loadServices(){

    const res = await fetch(api);

    const data = await res.json();

    container.innerHTML = "";

    data.forEach(item => {

        container.innerHTML += `

        <div class="service-box ${item.type}">

            <span class="icon">
                ${item.icon}
            </span>

            <h2>
                ${item.title}
            </h2>

            <p>
                ${item.description}
            </p>

            <a href="${item.type}.html">

                <button class="service-btn">
                    View ${item.type} Works
                </button>

            </a>

        </div>

        `;

    });

}

loadServices();


// FOOTER ANIMATION
const footer = document.querySelector(".footer");

if (footer) {

    const observer =
    new IntersectionObserver(entries => {

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