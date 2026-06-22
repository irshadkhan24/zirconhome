// =====================================================
// FRONTEND HOME.JS — FULLY FIXED
// All sections: navbar, hero, about, stats, parties,
// presence/map, footer render correctly from MongoDB
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

  const BASE = "http://localhost:5000";

  // =====================
  // LOAD HOME DATA
  // =====================
  async function loadHome() {
    try {
      const res = await fetch(`${BASE}/api/home`);
      const result = await res.json();
      if (!result.success) return;
      const data = result.data;

      renderNavbar(data.navbar);
      renderHeroSlides(data.heroSlides);
      renderAbout(data.about);
      renderStatsSection(data.statsSection, data.stats);
      renderParties(data.partiesSection, data.parties);
      renderPresence(data.presenceSection, data.presence);
      renderFooter(data.footer);

    } catch (err) {
      console.error("Load error:", err);
    }
  }

  // =====================
  // NAVBAR
  // =====================
  function renderNavbar(navbar) {
    if (!navbar?.logo) return;
    const logo = document.getElementById("navLogo");
    if (logo) logo.src = `${BASE}/${navbar.logo}`;
  }

  // =====================
  // HERO SLIDES
  // =====================
  function renderHeroSlides(heroSlides) {
    const container = document.getElementById("heroSlidesContainer");
    if (!container || !heroSlides?.length) return;

    container.innerHTML = "";
    heroSlides.forEach((slide, index) => {
      const div = document.createElement("div");
      div.className = "hero-slide" + (index === 0 ? " active" : "");
      div.innerHTML = `
        <div class="hero-overlay"></div>
        <div class="hero-text">
          <h3>${slide.subtitle || ""}</h3>
          <h1>${slide.title || ""}</h1>
          <p>${slide.description || ""}</p>
          <a href="${slide.btnLink || 'contact.html'}" class="contact-hero-btn">
            ${slide.btnText || "Contact Us"}
          </a>
        </div>
        <div class="hero-img">
          ${slide.image
            ? `<img src="${BASE}/${slide.image}" alt="${slide.title || ''}">`
            : ''}
        </div>
      `;
      container.appendChild(div);
    });

    initHeroSlider();
  }

  // =====================
  // ABOUT
  // =====================
  function renderAbout(about) {
    if (!about) return;

    const titleEl = document.getElementById("aboutTitle");
    if (titleEl && about.title) titleEl.innerHTML = about.title;

    const subEl = document.getElementById("aboutSubTitle");
    if (subEl) subEl.textContent = about.subTitle || "ABOUT";

    const imgEl = document.getElementById("aboutImg");
    if (imgEl) {
      if (about.image) {
        imgEl.src = `${BASE}/${about.image}`;
        imgEl.style.display = "block";
      }
      imgEl.style.opacity = "1";
      const imgWrapper = imgEl.closest(".about-image");
      if (imgWrapper) {
        imgWrapper.style.opacity = "1";
        imgWrapper.style.transform = "scale(1)";
      }
    }

    const descEl = document.getElementById("aboutDescription");
    if (descEl && about.description) {
      const lines = about.description.split("\n").filter(l => l.trim());
      if (lines.length > 1) {
        descEl.innerHTML = lines.map(l => `<p>${l}</p>`).join("");
      } else {
        descEl.innerHTML = `<p>${about.description}</p>`;
      }
    }

    setupAboutAnimation();
  }

  // =====================
  // STATS SECTION
  // =====================
  function renderStatsSection(statsSection, stats) {
    if (statsSection) {
      const titleEl = document.getElementById("statsTitle");
      const subEl = document.getElementById("statsSubtitle");
      const descEl = document.getElementById("statsDesc");
      if (titleEl && statsSection.title) titleEl.textContent = statsSection.title;
      if (subEl && statsSection.subtitle) {
        subEl.innerHTML = `<span>${statsSection.subtitle}</span>`;
      }
      if (descEl && statsSection.description) descEl.textContent = statsSection.description;
    }

    const grid = document.getElementById("statsGrid");
    if (!grid || !stats?.length) return;
    grid.innerHTML = "";
    stats.forEach(stat => {
      grid.innerHTML += `
        <div class="stat-item">
          <i class="${stat.icon || 'fa-solid fa-chart-line'}"></i>
         <h2
  class="counter"
  data-target="${stat.number || 0}"
  data-title="${stat.title || ''}"
>
  0
</h2>
          <h3>${stat.title || ""}</h3>
          <p>${stat.description || ""}</p>
        </div>
      `;
    });
    initStatItemAnim();
    initCounters();
  }

  // =====================
  // PARTIES CAROUSEL
  // =====================
  function renderParties(partiesSection, parties) {
    if (partiesSection) {
      const titleEl = document.getElementById("partiesTitle");
      const subEl = document.getElementById("partiesSubTitle");
      if (titleEl && partiesSection.title) titleEl.textContent = partiesSection.title;
      if (subEl && partiesSection.subTitle) subEl.textContent = partiesSection.subTitle;
    }

    const track = document.getElementById("partiesTrack");
    if (!track || !parties?.length) return;

    const validParties = parties.filter(p => p.logo);
    if (!validParties.length) return;

    track.innerHTML = "";
    validParties.forEach(party => {
      track.innerHTML += `
        <div class="carousel-item">
          <img src="${BASE}/${party.logo}" alt="${party.name || 'Partner'}">
        </div>
      `;
    });
    initCarousel();
  }

  // =====================
  // PRESENCE / MAP
  // =====================
  function renderPresence(presenceSection, presence) {
    if (presenceSection) {
      const titleEl = document.getElementById("presenceTitleFull");
      const subEl = document.getElementById("presenceSubTitle");

      if (titleEl) titleEl.textContent = presenceSection.title || "Our Presence Across India";
      if (subEl) subEl.textContent = presenceSection.subTitle || "";

      if (presenceSection.mapEmbedUrl) {
        const iframe = document.getElementById("mapIframe");
        if (iframe) iframe.src = presenceSection.mapEmbedUrl;
      }

      if (presenceSection.stateInfo) {
        const stateEl = document.getElementById("presenceStateInfo");
        if (stateEl) {
          stateEl.innerHTML = "";
          presenceSection.stateInfo.split("\n").forEach((line, i) => {
            if (line.trim()) {
              stateEl.innerHTML += `<p class="map-animate" style="transition-delay:${i * 0.2}s;">${line}</p>`;
            }
          });
        }
      }
    }

    const mapWrapper = document.querySelector(".map-wrapper");
    if (mapWrapper && presence?.length) {
      mapWrapper.querySelectorAll(".map-marker").forEach(m => m.remove());
      presence.forEach(p => {
        if (!p.city) return;
        const marker = document.createElement("div");
        marker.className = "map-marker";
       if (p.top) marker.style.top = p.top + "%";
if (p.left) marker.style.left = p.left + "%";
        marker.innerHTML = `<span class="marker-label">${p.city}</span>`;
        mapWrapper.appendChild(marker);
      });
      initMarkers();
    }
  }

  // =====================
  // FOOTER
  // =====================
  function renderFooter(footer) {
    if (!footer) return;

    const smallEl = document.getElementById("footerSmallTitle");
    const mainEl = document.getElementById("footerMainTitle");
    const descEl = document.getElementById("footerDesc");
    const btnEl = document.getElementById("footerBtn");
    const copyEl = document.getElementById("footerCopy");

    if (smallEl) smallEl.textContent = footer.smallTitle || "BUILDING EXCELLENCE";
    if (mainEl) mainEl.textContent = footer.mainTitle || "";
    if (descEl) descEl.textContent = footer.description || "";
    if (copyEl) {
  let text =
    footer.copyright ||
    "© 2026 Zircon Home | All Rights Reserved";

  text = text.replace(
    "Zircon Home",
    "<span>Zircon Home</span>"
  );

  copyEl.innerHTML = text;
}

    if (btnEl) {
      btnEl.innerHTML = `${footer.projectBtnText || "View Projects"} <i class="fa-solid fa-diagram-project"></i>`;
      if (footer.projectBtnLink) btnEl.href = footer.projectBtnLink;
    }

    // Social links
    const socials = {
      fbLink: footer.facebook,
      twLink: footer.twitter,
      igLink: footer.instagram,
      liLink: footer.linkedin,
      ytLink: footer.youtube
    };
    Object.entries(socials).forEach(([id, url]) => {
      const el = document.getElementById(id);
      if (el && url) el.href = url;
    });

    // Footer nav links — clear then fill columns
    const cols = {
      1: document.getElementById("footerCol1"),
      2: document.getElementById("footerCol2"),
      3: document.getElementById("footerCol3"),
      4: document.getElementById("footerCol4")
    };
    Object.values(cols).forEach(c => { if (c) c.innerHTML = ""; });

    if (footer.links?.length) {
      footer.links.forEach(link => {
        const colNum = parseInt(link.column);
        const col = cols[colNum];
        if (col) {
          col.innerHTML += `<a href="${link.url || '#'}"><i class="${link.icon || 'fa-solid fa-link'}"></i> ${link.title || ""}</a>`;
        }
      });
    }
  }

  // =====================
  // HERO SLIDER
  // =====================
  function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    let current = 0;

    function showSlide(i) {
      slides.forEach(s => {
        s.classList.remove("active");
        s.querySelectorAll("h1, h3, p, a").forEach(el => {
          el.style.animation = "none";
          el.style.opacity = "0";
          void el.offsetHeight;
          el.style.animation = "";
          el.style.opacity = "";
        });
        const img = s.querySelector(".hero-img img");
        if (img) {
          img.style.animation = "none";
          img.style.clipPath = "inset(0 100% 0 0)";
          void img.offsetHeight;
          img.style.animation = "";
          img.style.clipPath = "";
        }
      });
      slides[i].classList.add("active");
    }

    showSlide(0);

    if (slides.length > 1) {
      setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 5000);
    }
  }

  // =====================
  // CAROUSEL
  // =====================
  function initCarousel() {
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".carousel-button.prev");
    const nextBtn = document.querySelector(".carousel-button.next");
    if (!track) return;

    const items = Array.from(track.querySelectorAll(".carousel-item"));
    if (!items.length) return;

    // Clone for infinite loop
    items.forEach(item => track.appendChild(item.cloneNode(true)));

    let index = 0;

    function getItemWidth() {
      const item = track.querySelector(".carousel-item");
      return item ? item.offsetWidth + 20 : 220;
    }

    function move(dir = 1) {
      index += dir;
      const itemWidth = getItemWidth();
      track.style.transition = "transform 0.5s ease-in-out";
      track.style.transform = `translateX(-${index * itemWidth}px)`;

      if (index >= items.length) {
        setTimeout(() => {
          track.style.transition = "none";
          index = 0;
          track.style.transform = `translateX(0px)`;
        }, 510);
      } else if (index < 0) {
        setTimeout(() => {
          track.style.transition = "none";
          index = items.length - 1;
          track.style.transform = `translateX(-${index * getItemWidth()}px)`;
        }, 510);
      }
    }

    let auto = setInterval(() => move(1), 2500);

    if (nextBtn) nextBtn.addEventListener("click", () => { clearInterval(auto); move(1); auto = setInterval(() => move(1), 2500); });
    if (prevBtn) prevBtn.addEventListener("click", () => { clearInterval(auto); move(-1); auto = setInterval(() => move(1), 2500); });
  }

  // =====================
  // MAP MARKERS
  // =====================
  function initMarkers() {
    const markers = document.querySelectorAll(".map-marker");
    markers.forEach(marker => {
      marker.addEventListener("click", () => {
        markers.forEach(m => m.classList.remove("active"));
        marker.classList.add("active");
      });
    });
  }

  // =====================
  // COUNTER ANIMATION
  // =====================
  function initCounters() {

  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      const counter = entry.target;

      if (entry.isIntersecting) {

        const target = parseInt(counter.dataset.target) || 0;

        let current = 0;

        const duration = 2000;
        const stepTime = 20;
        const increment = target / (duration / stepTime);

        function updateCounter() {

          current += increment;

          if (current < target) {

            if (target >= 100) {
              counter.innerText =
                Math.floor(current) + "M+";
            } else {
              counter.innerText =
                Math.floor(current) + "+";
            }

            setTimeout(updateCounter, stepTime);

          } else {

            if (target >= 100) {
              counter.innerText = target + "M+";
            } else {
              counter.innerText = target + "+";
            }

          }

        }

        updateCounter();

      } else {

        counter.innerText = "0";

      }

    });

  }, {
    threshold: 0.4
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });

}

  // =====================
  // ABOUT ANIMATION
  // =====================
  function setupAboutAnimation() {

    const aboutText = document.querySelector(".about-text");
    const aboutImage = document.querySelector(".about-image");

    if (!aboutText || !aboutImage) return;

    aboutText.classList.add("anim-ready");
    aboutImage.classList.add("anim-ready");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                aboutText.classList.add("animate");
                aboutImage.classList.add("animate");

            } else {

                aboutText.classList.remove("animate");
                aboutImage.classList.remove("animate");

            }

        });

    }, {
        threshold: 0.25
    });

    observer.observe(aboutText);

}

  // =====================
  // STAT ITEM ANIMATION
  // =====================
  function initStatItemAnim() {
    const statItems = document.querySelectorAll(".stat-item");
    if (!statItems.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("animate", entry.isIntersecting));
    }, { threshold: 0.3 });
    statItems.forEach(item => obs.observe(item));
  }

  // =====================
  // STATS TEXT ANIMATION
  // =====================
  function initStatTextAnim() {
    const statTexts = document.querySelectorAll(".stat-text");
    statTexts.forEach((el, i) => { if (i % 2 === 0) el.classList.add("left"); });
    if (!statTexts.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("animate", entry.isIntersecting));
    }, { threshold: 0.4 });
    statTexts.forEach(el => obs.observe(el));
  }

  // =====================
  // CENTER ANIMATION
  // =====================
  function initCenterAnim() {
    const items = document.querySelectorAll(".center-animate");
    if (!items.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("show", entry.isIntersecting));
    }, { threshold: 0.3 });
    items.forEach((el, i) => { el.style.transitionDelay = `${i * 0.2}s`; obs.observe(el); });
  }

  // =====================
  // FOOTER ANIMATION
  // =====================
  function initFooterAnim() {
    const footer = document.querySelector(".premium-footer");
    if (!footer) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => footer.classList.toggle("show", entry.isIntersecting));
    }, { threshold: 0.15 });
    obs.observe(footer);
  }

  // =====================
  // MAP TEXT ANIMATION
  // =====================
  function initMapTextAnim() {
    const mapTexts = document.querySelectorAll(".map-animate");
    if (!mapTexts.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) mapTexts.forEach(el => el.classList.add("show"));
        else mapTexts.forEach(el => el.classList.remove("show"));
      });
    }, { threshold: 0.3 });
    obs.observe(mapTexts[0]);
  }

  // =====================
  // SMOOTH SCROLL
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
    });
  });

  // =====================
  // INIT ALL
  // =====================
  loadHome().then(() => {
    initStatTextAnim();
    initCenterAnim();
    initFooterAnim();
    initMapTextAnim();
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

});