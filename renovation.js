const renovationContainer =
document.getElementById("renovationContainer");


// GLOBAL
let currentImages = [];
let currentMeta = [];
let lbIndex = 0;
let lbInterval;
let isTransitioning = false;


// LOAD DATA FROM BACKEND
async function loadRenovationWorks() {

    try {

        const res = await fetch(
            "https://zirconhome.onrender.com/api/renovation"
        );

        const data = await res.json();

        renovationContainer.innerHTML = "";
        if(data.data.length > 0){

    renovationHeader.innerHTML = `

        <h1>
          ${data.data[0].mainHeading}
        </h1>

        <p>
          ${data.data[0].mainDescription}
        </p>

    `;
}

        data.data.forEach((work, sectionIndex) => {

            renovationContainer.innerHTML += `

            <div class="renovation-type">

                <div class="renovation-header">
                    ${work.sectionTitle}
                </div>

                <div class="renovation-content">

                    <div 
                        class="image-container carousel"
                        data-index="${sectionIndex}"
                    >

                        <div class="carousel-track">

                            ${work.images.map(img => `

                                <img 
                                  src="https://zirconhome.onrender.com${img}"
                                  alt=""
                                >

                            `).join("")}

                        </div>

                        <div class="hover-text">
                            Click Now
                        </div>

                    </div>

                    <div class="renovation-text">

                        <p>
                            <strong>Purpose:</strong>
                            ${work.purpose}
                        </p>

                        <p>
                            <strong>Material Used:</strong>
                            ${work.materialUsed}
                        </p>

                        <p>
                            <strong>Advantages:</strong>
                            ${work.advantages}
                        </p>

                    </div>

                </div>

            </div>
            `;
        });

        initCarousel(data.data);

    } catch (error) {
        console.log(error);
    }

}


// SMALL CAROUSEL
function initCarousel(allWorks) {

    document.querySelectorAll(".carousel")
    .forEach(carousel => {

        const track =
        carousel.querySelector(".carousel-track");

        const slides =
        Array.from(track.querySelectorAll("img"));

        if (!slides.length) return;

        const slideWidth =
        carousel.getBoundingClientRect().width;

        let index = 0;
        let interval;

        // clone first image
        track.appendChild(
            slides[0].cloneNode(true)
        );

        function moveCarousel() {

            index++;

            track.style.transition =
            "transform 0.6s ease-in-out";

            track.style.transform =
            `translateX(-${index * slideWidth}px)`;

            if (index === slides.length) {

                setTimeout(() => {

                    track.style.transition = "none";

                    track.style.transform =
                    "translateX(0)";

                    index = 0;

                }, 600);

            }

        }

        interval = setInterval(moveCarousel, 3000);

        carousel.addEventListener("mouseenter", () => {
            clearInterval(interval);
        });

        carousel.addEventListener("mouseleave", () => {
            interval = setInterval(moveCarousel, 3000);
        });


        // LIGHTBOX OPEN
        carousel.addEventListener("click", (e) => {

            const clickedImg =
            e.target.closest("img");

            if (!clickedImg) return;

            const sectionIndex =
            carousel.dataset.index;

            const work =
            allWorks[sectionIndex];

            currentMeta =
            work.imageDetails.map(item => ({
                src:
                `https://zirconhome.onrender.com${item.image}`,

                title:
                item.title,

                text:
                item.text
            }));

            currentImages =
            currentMeta.map(item => item.src);

            const clickedIndex =
            slides.indexOf(clickedImg);

            lbIndex = clickedIndex;

            openLightbox();

        });

    });

}



// LIGHTBOX
const lightbox =
document.getElementById("lightbox-renovation");

const trackLB =
document.getElementById("lightbox-track-renovation");

const lbTitle =
document.getElementById("lb-title-renovation");

const lbText =
document.getElementById("lb-text-renovation");

const closeBtn =
lightbox.querySelector(".close");

const prevBtn =
lightbox.querySelector(".prev");

const nextBtn =
lightbox.querySelector(".next");



function openLightbox() {

    lbIndex = Math.max(
        0,
        Math.min(lbIndex, currentImages.length - 1)
    );

    trackLB.innerHTML = "";

    const slideWidth =
    lightbox
    .querySelector(".lightbox-viewport")
    .getBoundingClientRect().width;

    currentImages.forEach(src => {

        const img =
        document.createElement("img");

        img.src = src;

        trackLB.appendChild(img);

    });

    // clone first
    trackLB.appendChild(
        trackLB.children[0].cloneNode(true)
    );

    lightbox.style.display = "flex";

    trackLB.style.transition = "none";

    trackLB.style.transform =
    `translateX(-${lbIndex * slideWidth}px)`;

    updateDescription();

    startAuto();

}



function updateDescription() {

    if (currentMeta[lbIndex]) {

        lbTitle.textContent =
        currentMeta[lbIndex].title;

        lbText.textContent =
        currentMeta[lbIndex].text;

    }

}



// NEXT
function moveNext() {

    if (isTransitioning) return;

    isTransitioning = true;

    const slideWidth =
    document.querySelector(".lightbox-viewport")
    .getBoundingClientRect().width;

    lbIndex++;

    trackLB.style.transition =
    "transform 0.7s ease-in-out";

    trackLB.style.transform =
    `translateX(-${lbIndex * slideWidth}px)`;


    setTimeout(() => {

        if (lbIndex === currentImages.length) {

            trackLB.style.transition = "none";

            lbIndex = 0;

            trackLB.style.transform =
            `translateX(-${lbIndex * slideWidth}px)`;

        }

        updateDescription();

        isTransitioning = false;

    }, 700);

}



// PREV
function movePrev() {

    if (isTransitioning) return;

    isTransitioning = true;

    const slideWidth =
    document.querySelector(".lightbox-viewport")
    .getBoundingClientRect().width;

    // LAST image pe jump
    if (lbIndex <= 0) {

        lbIndex = currentImages.length - 1;

        trackLB.style.transition = "none";

        trackLB.style.transform =
        `translateX(-${lbIndex * slideWidth}px)`;

        setTimeout(() => {

            isTransitioning = false;

            updateDescription();

        }, 50);

        return;
    }

    lbIndex--;

    trackLB.style.transition =
    "transform 0.7s ease-in-out";

    trackLB.style.transform =
    `translateX(-${lbIndex * slideWidth}px)`;

    setTimeout(() => {

        updateDescription();

        isTransitioning = false;

    }, 700);

}

// AUTO
function startAuto() {

    stopAuto();

    lbInterval =
    setInterval(moveNext, 3000);

}

function stopAuto() {

    clearInterval(lbInterval);

}



// EVENTS
nextBtn.onclick = (e) => {

    e.stopPropagation();

    stopAuto();

    moveNext();

    startAuto();

};

prevBtn.onclick = (e) => {

    e.stopPropagation();

    stopAuto();

    movePrev();

    startAuto();

};

closeBtn.onclick = (e) => {

    e.stopPropagation();

    lightbox.style.display = "none";

    stopAuto();

};

lightbox.onclick = (e) => {

    if (e.target === lightbox) {

        lightbox.style.display = "none";

        stopAuto();

    }

};



// FOOTER ANIMATION
const footer =
document.querySelector(".footer");

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



// START
loadRenovationWorks();

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