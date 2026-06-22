const api = "http://localhost:5000/api/parties"
const grid = document.getElementById("clientsGrid")

async function loadCompanies() {
    const res = await fetch(api)
    const data = await res.json()

    grid.innerHTML = ""

    data.forEach(p => {
        grid.innerHTML += `
        <div class="client-logo reveal">
            <img src="http://localhost:5000${p.logo}" alt="Company Logo">
        </div>
        `
    })

    revealOnScroll() // trigger animation for logos in view
}

loadCompanies()

// Scroll Animation for logos & heading/paragraph
function revealOnScroll() {
    document.querySelectorAll(".reveal, .reveal-center").forEach(el => {
        const windowHeight = window.innerHeight
        const elementTop = el.getBoundingClientRect().top
        const visiblePoint = 100

        if (elementTop < windowHeight - visiblePoint) {
            el.classList.add("active")
        }
    })
}

window.addEventListener("scroll", revealOnScroll)
window.addEventListener("load", revealOnScroll)

// Footer Animation
const footer = document.querySelector(".footer")

if (footer) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add("show")
            } else {
                footer.classList.remove("show")
            }
        })
    }, { threshold: 0.2 })

    observer.observe(footer)
}

  // MOBILE MENU

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}