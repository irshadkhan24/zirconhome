// =====================================================
// ADMIN HOME.JS — FULLY FIXED
// Fixes:
// 1. Form data clears/resets after save
// 2. Data preview uses correct CSS class names
// 3. Edit button loads data into form properly
// 4. Delete works from preview directly
// 5. Preview only shows when MongoDB has data
// =====================================================

let state = {
  slides: [],
  stats: [],
  parties: [],
  presence: [],
  footerLinks: []
};

let fileStore = {
  navbarLogo: null,
  aboutImage: null,
  heroImages: {},
  partyLogos: {}
};

const API = "http://zirconhome.onrender.com/api/home";
const $ = (id) => document.getElementById(id);

function escHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  loadHome();
  setupGlobalFileListeners();
});

// =====================
// GLOBAL FILE LISTENERS
// =====================
function setupGlobalFileListeners() {
  const navFile = $("navbarLogo");
  if (navFile) {
    navFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      fileStore.navbarLogo = file;
      const preview = $("navbarLogoPreview");
      if (preview) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
      }
    });
  }

  const aboutFile = $("aboutImage");
  if (aboutFile) {
    aboutFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      fileStore.aboutImage = file;
      const preview = $("aboutPreview");
      if (preview) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
      }
    });
  }
}

// =====================
// DYNAMIC FILE HANDLER
// =====================
function handleDynamicFileChange(type, idx, event) {
  const file = event.target.files[0];
  if (!file) return;
  if (type === 'hero') {
    fileStore.heroImages[idx] = file;
    const container = event.target.nextElementSibling;
    if (container) {
      container.innerHTML = `<img src="${URL.createObjectURL(file)}" style="max-width:200px;border:2px dashed #4A90E2;border-radius:6px;margin-top:4px;">`;
    }
  } else if (type === 'party') {
    fileStore.partyLogos[idx] = file;
    const container = event.target.nextElementSibling;
    if (container) {
      container.innerHTML = `<img src="${URL.createObjectURL(file)}" style="max-width:120px;max-height:80px;border:2px dashed #4A90E2;border-radius:6px;margin-top:4px;">`;
    }
  }
}

// =====================
// CAPTURE FUNCTIONS
// =====================
function captureSlidesData() {
  const cards = document.querySelectorAll("#slidesContainer .slideCard");
  cards.forEach((card, idx) => {
    if (!state.slides[idx]) state.slides[idx] = {};
    state.slides[idx].title = card.querySelector(".heroTitle").value;
    state.slides[idx].subtitle = card.querySelector(".heroSubtitle").value;
    state.slides[idx].description = card.querySelector(".heroDescription").value;
    state.slides[idx].btnText = card.querySelector(".heroBtnText").value;
    state.slides[idx].btnLink = card.querySelector(".heroBtnLink").value;
  });
}

function captureStatsData() {
  const cards = document.querySelectorAll("#statsContainer .statCard");
  cards.forEach((card, idx) => {
    if (!state.stats[idx]) state.stats[idx] = {};
    state.stats[idx].icon = card.querySelector(".statIcon").value;
    state.stats[idx].number = card.querySelector(".statCounter").value;
    state.stats[idx].title = card.querySelector(".statTitle").value;
    state.stats[idx].description = card.querySelector(".statDescription").value;
  });
}

function capturePartiesData() {
  const cards = document.querySelectorAll("#partiesContainer .partyCard");
  cards.forEach((card, idx) => {
    if (!state.parties[idx]) state.parties[idx] = {};
    state.parties[idx].name = card.querySelector(".partyName").value;
  });
}

function capturePresenceData() {
  const cards = document.querySelectorAll("#presenceContainer .markerCard");
  cards.forEach((card, idx) => {
    if (!state.presence[idx]) state.presence[idx] = {};
    state.presence[idx].city = card.querySelector(".cityName").value;
    state.presence[idx].lat = card.querySelector(".cityLat").value;
    state.presence[idx].lng = card.querySelector(".cityLng").value;
  });
}

function captureFooterLinksData() {
  const cards = document.querySelectorAll("#footerLinksContainer .footerLinkCard");
  cards.forEach((card, idx) => {
    if (!state.footerLinks[idx]) state.footerLinks[idx] = {};
    state.footerLinks[idx].column = card.querySelector(".linkCol").value;
    state.footerLinks[idx].icon = card.querySelector(".linkIcon").value;
    state.footerLinks[idx].title = card.querySelector(".linkTitle").value;
    state.footerLinks[idx].url = card.querySelector(".linkUrl").value;
  });
}

// =====================
// LOAD DATA FROM API
// =====================
async function loadHome() {

   console.log("LOAD HOME CALLED");
  try {
    const res = await fetch(API);
    const result = await res.json();
    if (!result.success) return;
    const data = result.data;

    // Reset file stores on reload
    fileStore = { navbarLogo: null, aboutImage: null, heroImages: {}, partyLogos: {} };

    // Navbar logo
    if (data.navbar?.logo) {
      const preview = $("navbarLogoPreview");
      if (preview) {
        preview.src = `http://zirconhome.onrender.com/${data.navbar.logo}`;
        preview.style.display = "block";
      }
    }

    // About
    if (data.about) {
      $("aboutTitle").value = data.about.title || "";
      $("aboutSubTitle").value = data.about.subTitle || "";
      $("aboutDescription").value = data.about.description || "";
      if (data.about.image) {
        const img = $("aboutPreview");
        if (img) { img.src = `http://zirconhome.onrender.com/${data.about.image}`; img.style.display = "block"; }
      }
    }

    // Stats section
    $("statsTitle").value = data.statsSection?.title || "";
    $("statsSubtitle").value = data.statsSection?.subtitle || "";
    $("statsDescription").value = data.statsSection?.description || "";

    // Parties section
    $("partiesTitle").value = data.partiesSection?.title || "";
    $("partiesSubTitle").value = data.partiesSection?.subTitle || "";

    // Presence section
    $("presenceTitle").value = data.presenceSection?.title || "";
    $("presenceSubTitle").value = data.presenceSection?.subTitle || "";
    $("mapEmbedUrl").value = data.presenceSection?.mapEmbedUrl || "";
    $("statePresence").value = data.presenceSection?.stateInfo || "";

    // Footer
    const footer = data.footer || {};
    $("footerTopSmallTitle").value = footer.smallTitle || "";
    $("footerTopMainTitle").value = footer.mainTitle || "";
    $("footerDescription").value = footer.description || "";
    $("projectBtnText").value = footer.projectBtnText || "";
    $("projectBtnLink").value = footer.projectBtnLink || "";
    $("facebook").value = footer.facebook || "";
    $("twitter").value = footer.twitter || "";
    $("instagram").value = footer.instagram || "";
    $("linkedin").value = footer.linkedin || "";
    $("youtube").value = footer.youtube || "";
    $("copyrightText").value = footer.copyright || "";

    // State arrays
    state.slides = data.heroSlides || [];
    state.stats = data.stats || [];
    state.parties = data.parties || [];
    state.presence = (data.presence || []).map(p => ({
      city: p.city || "",
      lat: p.top || "",
      lng: p.left || ""
    }));
    state.footerLinks = footer.links || [];

    renderAll();

    // Show preview only if MongoDB has real data
    const hasData = state.slides.length > 0 || state.stats.length > 0 ||
      state.parties.length > 0 || data.about?.title || footer.mainTitle;
    const previewContainer = $("dataPreviewSection");
    if (previewContainer) {
      if (hasData) {
        renderDataPreview(data);
      } else {
        previewContainer.innerHTML = "";
      }
    }

  } catch (err) {
    console.error("Load error:", err);
  }
}

function renderAll() {
  renderSlides();
  renderStats();
  renderParties();
  renderPresence();
  renderFooterLinks();
}

// =====================
// RENDER SLIDES
// =====================
function renderSlides() {
  const container = $("slidesContainer");
  if (!container) return;
  container.innerHTML = "";
  state.slides.forEach((s, i) => {
    let imgPreview = "";
    if (fileStore.heroImages[i]) {
      imgPreview = `<img src="${URL.createObjectURL(fileStore.heroImages[i])}" style="max-width:200px;border:2px dashed #4A90E2;border-radius:6px;margin-top:4px;">`;
    } else if (s.image) {
      imgPreview = `<img src="http://zirconhome.onrender.com/${s.image}" style="max-width:200px;border-radius:6px;margin-top:4px;">`;
    }
    const div = document.createElement("div");
    div.className = "slideCard";
    div.innerHTML = `
      <h3>Slide ${i + 1}</h3>
      <input type="text" class="heroTitle" placeholder="Title" value="${escHtml(s.title)}">
      <input type="text" class="heroSubtitle" placeholder="Subtitle" value="${escHtml(s.subtitle)}">
      <textarea class="heroDescription" placeholder="Description">${escHtml(s.description)}</textarea>
      <label style="font-size:13px;color:#6b7280;margin-top:6px;display:block;">Slide Image:</label>
      <input type="file" class="heroImage" accept="image/*" onchange="handleDynamicFileChange('hero', ${i}, event)">
      <div class="imagePreviewContainer">${imgPreview}</div>
      <div class="grid2" style="margin-top:10px;">
        <input type="text" class="heroBtnText" placeholder="Button Text" value="${escHtml(s.btnText)}">
        <input type="text" class="heroBtnLink" placeholder="Button Link (e.g. contact.html)" value="${escHtml(s.btnLink)}">
      </div>
      <button type="button" class="deleteBtn" onclick="deleteSlide(${i})"><i class="fa-solid fa-trash"></i> Delete Slide</button>
    `;
    container.appendChild(div);
  });
}

function deleteSlide(i) {
  if (!confirm("Delete this slide?")) return;
  captureSlidesData();
  state.slides.splice(i, 1);
  const newImages = {};
  Object.keys(fileStore.heroImages).forEach(k => {
    const ki = parseInt(k);
    if (ki < i) newImages[ki] = fileStore.heroImages[ki];
    else if (ki > i) newImages[ki - 1] = fileStore.heroImages[ki];
  });
  fileStore.heroImages = newImages;
  renderSlides();
}

const addSlideBtn = $("addSlideBtn");
if (addSlideBtn) {
  addSlideBtn.addEventListener("click", () => {
    captureSlidesData();
    state.slides.push({ title: "", subtitle: "", description: "", image: "", btnText: "", btnLink: "" });
    renderSlides();
    // Scroll to new slide
    setTimeout(() => {
      const cards = document.querySelectorAll("#slidesContainer .slideCard");
      if (cards.length) cards[cards.length - 1].scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  });
}

// =====================
// RENDER STATS
// =====================
function renderStats() {
  const container = $("statsContainer");
  if (!container) return;
  container.innerHTML = "";
  state.stats.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "statCard";
    div.innerHTML = `
      <div class="grid2">
        <input type="text" class="statIcon" placeholder="Icon Class (e.g. fa-solid fa-building)" value="${escHtml(s.icon)}">
        <input type="text" class="statCounter" placeholder="Number (e.g. 500)" value="${escHtml(String(s.number || ''))}">
      </div>
      <input type="text" class="statTitle" placeholder="Heading" value="${escHtml(s.title)}">
      <textarea class="statDescription" placeholder="Description">${escHtml(s.description)}</textarea>
      <button type="button" class="deleteStatBtn" onclick="deleteStat(${i})"><i class="fa-solid fa-trash"></i> Delete Stat</button>
    `;
    container.appendChild(div);
  });
}

function deleteStat(i) {
  if (!confirm("Delete this stat?")) return;
  captureStatsData();
  state.stats.splice(i, 1);
  renderStats();
}

const addStatBtn = $("addStatBtn");
if (addStatBtn) {
  addStatBtn.addEventListener("click", () => {
    captureStatsData();
    state.stats.push({ icon: "", number: "", title: "", description: "" });
    renderStats();
  });
}

// =====================
// RENDER PARTIES
// =====================
function renderParties() {
  const container = $("partiesContainer");
  if (!container) return;
  container.innerHTML = "";
  state.parties.forEach((p, i) => {
    let logoPreview = "";
    if (fileStore.partyLogos[i]) {
      logoPreview = `<img src="${URL.createObjectURL(fileStore.partyLogos[i])}" style="max-width:120px;max-height:80px;border:2px dashed #4A90E2;border-radius:6px;margin-top:4px;">`;
    } else if (p.logo) {
      logoPreview = `<img src="http://zirconhome.onrender.com/${p.logo}" style="max-width:120px;max-height:80px;border-radius:6px;margin-top:4px;">`;
    }
    const div = document.createElement("div");
    div.className = "partyCard";
    div.innerHTML = `
      <input type="text" class="partyName" placeholder="Partner / Party Name" value="${escHtml(p.name)}">
      <label style="font-size:13px;color:#6b7280;margin-top:6px;display:block;">Logo Image:</label>
      <input type="file" class="partyLogo" accept="image/*" onchange="handleDynamicFileChange('party', ${i}, event)">
      <div class="imagePreviewContainer">${logoPreview}</div>
      <button type="button" class="deletePartyBtn" onclick="deleteParty(${i})"><i class="fa-solid fa-trash"></i> Delete Party</button>
    `;
    container.appendChild(div);
  });
}

function deleteParty(i) {
  if (!confirm("Delete this partner?")) return;
  capturePartiesData();
  state.parties.splice(i, 1);
  const newLogos = {};
  Object.keys(fileStore.partyLogos).forEach(k => {
    const ki = parseInt(k);
    if (ki < i) newLogos[ki] = fileStore.partyLogos[ki];
    else if (ki > i) newLogos[ki - 1] = fileStore.partyLogos[ki];
  });
  fileStore.partyLogos = newLogos;
  renderParties();
}

const addPartyBtn = $("addPartyBtn");
if (addPartyBtn) {
  addPartyBtn.addEventListener("click", () => {
    capturePartiesData();
    state.parties.push({ name: "", logo: "" });
    renderParties();
  });
}

// =====================
// RENDER PRESENCE
// =====================
function renderPresence() {
  const container = $("presenceContainer");
  if (!container) return;
  container.innerHTML = "";
  state.presence.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "markerCard";
    div.innerHTML = `
      <input type="text" class="cityName" placeholder="City Name (e.g. Mumbai)" value="${escHtml(p.city)}">
      <input type="text" class="cityLat" placeholder="Map Top % (e.g. 62%)" value="${escHtml(p.lat)}">
      <input type="text" class="cityLng" placeholder="Map Left % (e.g. 22%)" value="${escHtml(p.lng)}">
      <button type="button" class="deleteMarkerBtn" onclick="deletePresence(${i})"><i class="fa-solid fa-trash"></i></button>
    `;
    container.appendChild(div);
  });
}

function deletePresence(i) {
  if (!confirm("Delete this city?")) return;
  capturePresenceData();
  state.presence.splice(i, 1);
  renderPresence();
}

const addPresenceBtn = $("addPresenceBtn");
if (addPresenceBtn) {
  addPresenceBtn.addEventListener("click", () => {
    capturePresenceData();
    state.presence.push({ city: "", lat: "", lng: "" });
    renderPresence();
  });
}

// =====================
// RENDER FOOTER LINKS
// =====================
function renderFooterLinks() {
  const container = $("footerLinksContainer");
  if (!container) return;
  container.innerHTML = "";
  state.footerLinks.forEach((fl, i) => {
    const div = document.createElement("div");
    div.className = "footerLinkCard";
    div.innerHTML = `
      <select class="linkCol">
        <option value="1" ${fl.column == 1 ? 'selected' : ''}>Column 1</option>
        <option value="2" ${fl.column == 2 ? 'selected' : ''}>Column 2</option>
        <option value="3" ${fl.column == 3 ? 'selected' : ''}>Column 3</option>
        <option value="4" ${fl.column == 4 ? 'selected' : ''}>Column 4</option>
      </select>
      <input type="text" class="linkIcon" placeholder="Icon (e.g. fa-solid fa-house)" value="${escHtml(fl.icon)}">
      <input type="text" class="linkTitle" placeholder="Link Text" value="${escHtml(fl.title)}">
      <input type="text" class="linkUrl" placeholder="URL (e.g. home.html)" value="${escHtml(fl.url)}">
      <button type="button" class="deleteFooterLinkBtn" onclick="deleteFooterLink(${i})"><i class="fa-solid fa-trash"></i></button>
    `;
    container.appendChild(div);
  });
}

function deleteFooterLink(i) {
  if (!confirm("Delete this link?")) return;
  captureFooterLinksData();
  state.footerLinks.splice(i, 1);
  renderFooterLinks();
}

const addFooterLinkBtn = $("addFooterLinkBtn");
if (addFooterLinkBtn) {
  addFooterLinkBtn.addEventListener("click", () => {
    captureFooterLinksData();
    state.footerLinks.push({ column: "1", icon: "fa-solid fa-chevron-right", title: "", url: "" });
    renderFooterLinks();
  });
}

// =====================================================
// FORM SUBMIT — FIXED (form resets after save)
// =====================================================
$("homeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  captureSlidesData();
  captureStatsData();
  capturePartiesData();
  capturePresenceData();
  captureFooterLinksData();

  const formData = new FormData();

  // Files
  if (fileStore.navbarLogo) formData.append("navbarLogo", fileStore.navbarLogo);
  if (fileStore.aboutImage) formData.append("aboutImage", fileStore.aboutImage);

  // About
  formData.append("aboutTitle", $("aboutTitle").value);
  formData.append("aboutSubTitle", $("aboutSubTitle").value);
  formData.append("aboutDescription", $("aboutDescription").value);

  // Stats section
  formData.append("statsTitle", $("statsTitle").value);
  formData.append("statsSubtitle", $("statsSubtitle").value);
  formData.append("statsDescription", $("statsDescription").value);

  // Parties section
  formData.append("partiesTitle", $("partiesTitle").value);
  formData.append("partiesSubTitle", $("partiesSubTitle").value);

  // Presence section
  formData.append("presenceTitle", $("presenceTitle").value);
  formData.append("presenceSubTitle", $("presenceSubTitle").value);
  formData.append("mapEmbedUrl", $("mapEmbedUrl").value);
  formData.append("stateInfo", $("statePresence").value);

  // Footer
  formData.append("footerSmallTitle", $("footerTopSmallTitle").value);
  formData.append("footerMainTitle", $("footerTopMainTitle").value);
  formData.append("footerDescription", $("footerDescription").value);
  formData.append("projectBtnText", $("projectBtnText").value);
  formData.append("projectBtnLink", $("projectBtnLink").value);
  formData.append("facebook", $("facebook").value);
  formData.append("twitter", $("twitter").value);
  formData.append("instagram", $("instagram").value);
  formData.append("linkedin", $("linkedin").value);
  formData.append("youtube", $("youtube").value);
  formData.append("copyright", $("copyrightText").value);

  // Hero slides indexed
  state.slides.forEach((s, idx) => {
    formData.append(`heroSlides[${idx}][title]`, s.title || "");
    formData.append(`heroSlides[${idx}][subtitle]`, s.subtitle || "");
    formData.append(`heroSlides[${idx}][description]`, s.description || "");
    formData.append(`heroSlides[${idx}][btnText]`, s.btnText || "");
    formData.append(`heroSlides[${idx}][btnLink]`, s.btnLink || "");
    if (fileStore.heroImages[idx]) {
      formData.append(`heroSlides[${idx}][image]`, fileStore.heroImages[idx]);
    } else if (s.image) {
      formData.append(`heroSlides[${idx}][image]`, s.image);
    }
  });

  // Stats indexed
  state.stats.forEach((s, idx) => {
    formData.append(`stats[${idx}][icon]`, s.icon || "");
    formData.append(`stats[${idx}][number]`, s.number || 0);
    formData.append(`stats[${idx}][title]`, s.title || "");
    formData.append(`stats[${idx}][description]`, s.description || "");
  });

  // Parties indexed
  state.parties.forEach((p, idx) => {
    formData.append(`parties[${idx}][name]`, p.name || "");
    if (fileStore.partyLogos[idx]) {
      formData.append(`parties[${idx}][logo]`, fileStore.partyLogos[idx]);
    } else if (p.logo) {
      formData.append(`parties[${idx}][logo]`, p.logo);
    }
  });

  // Presence indexed
  state.presence.forEach((p, idx) => {
    formData.append(`presence[${idx}][city]`, p.city || "");
    formData.append(`presence[${idx}][lat]`, p.lat || "");
    formData.append(`presence[${idx}][lng]`, p.lng || "");
  });

  // Footer links indexed
  state.footerLinks.forEach((fl, idx) => {
    formData.append(`footerLinks[${idx}][column]`, fl.column || 1);
    formData.append(`footerLinks[${idx}][icon]`, fl.icon || "");
    formData.append(`footerLinks[${idx}][title]`, fl.title || "");
    formData.append(`footerLinks[${idx}][url]`, fl.url || "");
  });

  const saveBtn = document.querySelector(".saveBtn");
  if (saveBtn) { saveBtn.disabled = true; saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...'; }

  try {
    const res = await fetch(API, { method: "POST", body: formData });
    const result = await res.json();
  if (result.success) {

  showToast("✅ Home data saved successfully!", "success");

 clearHomeForm();
 console.log("FORM CLEARED");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
    
    else {
      showToast("❌ Error: " + (result.message || "Save failed"), "error");
    }
  } catch (err) {
    console.error("Save error:", err);
    showToast("❌ Cannot connect to backend", "error");
  } finally {
    if (saveBtn) { saveBtn.disabled = false; saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Home Data'; }
  }
});

function clearHomeForm() {

    console.log("CLEAR START");

  document.getElementById("homeForm").reset();

  console.log("About Title After Reset:",
    document.getElementById("aboutTitle").value
  );

  console.log("Stats Title After Reset:",
    document.getElementById("statsTitle").value
  );

  console.log("CLEAR END");

  state = {
    slides: [],
    stats: [],
    parties: [],
    presence: [],
    footerLinks: []
  };

  fileStore = {
    navbarLogo: null,
    aboutImage: null,
    heroImages: {},
    partyLogos: {}
  };

  renderAll();

  document.querySelectorAll("img").forEach(img=>{
    if(
      img.id==="aboutPreview" ||
      img.id==="navbarLogoPreview"
    ){
      img.src="";
      img.style.display="none";
    }
  });

  console.log("CLEAR END");
}

// =====================
// TOAST NOTIFICATION
// =====================
function showToast(message, type = "success") {
  let toast = document.getElementById("adminToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "adminToast";
    toast.style.cssText = `position:fixed;bottom:30px;right:30px;z-index:9999;padding:14px 24px;
      border-radius:10px;font-size:15px;font-weight:600;color:#fff;
      box-shadow:0 4px 20px rgba(0,0,0,0.3);transition:all 0.4s ease;
      transform:translateY(100px);opacity:0;min-width:280px;text-align:center;`;
    document.body.appendChild(toast);
  }
  toast.style.background = type === "success" ? "#10b981" : "#ef4444";
  toast.textContent = message;
  toast.style.transform = "translateY(0)";
  toast.style.opacity = "1";
  setTimeout(() => { toast.style.transform = "translateY(100px)"; toast.style.opacity = "0"; }, 3500);
}

// =====================================================
// DATA PREVIEW — FULLY FIXED
// - Uses correct CSS class names (previewBlock, previewSlideCard, etc.)
// - Edit button loads data directly into the form
// - Delete calls API and refreshes
// - Only renders when MongoDB has data
// =====================================================
function renderDataPreview(data) {
  const container = $("dataPreviewSection");
  if (!container) return;

  const footer = data.footer || {};

  // --- Slides HTML ---
  let slidesHtml = "";

if (data.heroSlides?.length) {

    slidesHtml = `<div class="previewSlidesGrid">`;

    data.heroSlides.forEach((s, idx) => {
        slidesHtml += `
        <div class="previewSlideCard">
        <div class="previewSlideLeft">
          ${s.image
            ? `<img class="previewSlideImg" src="http://zirconhome.onrender.com/${s.image}" alt="Slide ${idx+1}">`
            : `<div class="previewNoImg"><i class="fa-solid fa-image"></i></div>`}
        </div>
        <div class="previewSlideRight">
          <div class="previewSlideNum">Slide #${idx + 1}</div>
          <div class="previewRow"><span class="previewLabel">Title:</span> ${escHtml(s.title || '—')}</div>
          <div class="previewRow"><span class="previewLabel">Subtitle:</span> ${escHtml(s.subtitle || '—')}</div>
          <div class="previewRow previewDesc">${escHtml(s.description || '—')}</div>
          <div class="previewRow"><span class="previewLabel">Button:</span> ${escHtml(s.btnText || '—')} → ${escHtml(s.btnLink || '—')}</div>
        </div>
        <div class="previewActions">
          <button class="previewEditBtn" onclick="editSlideInForm(${idx})"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="previewDeleteBtn" onclick="deleteSlideFromPreview('${s._id}', ${idx})"><i class="fa-solid fa-trash"></i> Delete</button>
        </div>
      </div>`;
    });
    slidesHtml += `</div>`;
  } else {
     slidesHtml = `
      <p class="previewEmpty">
        No slides yet. Add slides using the form above.
      </p>
    `;
  }

  // --- Stats HTML ---
  let statsHtml = "";
  if (data.stats?.length) {
    statsHtml = `<div class="previewStatsGrid">`;
    data.stats.forEach((s, idx) => {
      statsHtml += `<div class="previewStatItem">
        <i class="${escHtml(s.icon || 'fa-solid fa-chart-bar')}"></i>
        <div class="previewStatNum">${escHtml(String(s.number || '0'))}</div>
        <div class="previewStatTitle">${escHtml(s.title || '')}</div>
        <p class="previewStatDesc">${escHtml(s.description || '')}</p>
        <div class="previewStatActions">
          <button class="previewEditBtnSm" onclick="editStatInForm(${idx})"><i class="fa-solid fa-pen"></i></button>
          <button class="previewDeleteBtnSm" onclick="deleteStatLocal(${idx})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    });
    statsHtml += `</div>`;
  } else {
    statsHtml = `<p class="previewEmpty">No stats yet.</p>`;
  }

  // --- Parties HTML ---
  let partiesHtml = "";
  if (data.parties?.length) {
    partiesHtml = `<div class="previewPartiesGrid">`;
    data.parties.forEach((p, idx) => {
      partiesHtml += `<div class="previewPartyItem">
        ${p.logo ? `<img src="http://zirconhome.onrender.com/${p.logo}" alt="${escHtml(p.name)}">` : `<div class="previewNoImg small"><i class="fa-solid fa-handshake"></i></div>`}
        <div><b>${escHtml(p.name || '—')}</b></div>
        <div class="previewPartyActions">
          <button class="previewEditBtnSm" onclick="editPartyInForm(${idx})"><i class="fa-solid fa-pen"></i></button>
          <button class="previewDeleteBtnSm" onclick="deletePartyFromPreview('${p._id}', ${idx})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    });
    partiesHtml += `</div>`;
  } else {
    partiesHtml = `<p class="previewEmpty">No parties yet.</p>`;
  }

  // --- Footer links ---
  let flHtml = { 1: "", 2: "", 3: "", 4: "" };
  if (footer.links?.length) {
    footer.links.forEach(l => {
      const c = parseInt(l.column) || 1;
      flHtml[c] += `<div class="previewFooterLink"><i class="${escHtml(l.icon || 'fa-solid fa-link')}"></i> <a href="${escHtml(l.url || '#')}" target="_blank">${escHtml(l.title || '')}</a></div>`;
    });
  }

  // --- Social links ---
  let socialHtml = "";
  const socialMap = [
    { key: 'facebook', icon: 'fa-brands fa-facebook-f', label: 'Facebook' },
    { key: 'twitter', icon: 'fa-brands fa-x-twitter', label: 'Twitter/X' },
    { key: 'instagram', icon: 'fa-brands fa-instagram', label: 'Instagram' },
    { key: 'linkedin', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
    { key: 'youtube', icon: 'fa-brands fa-youtube', label: 'YouTube' }
  ];
  socialMap.forEach(s => {
    if (footer[s.key]) {
      socialHtml += `<a class="previewSocialChip" href="${escHtml(footer[s.key])}" target="_blank"><i class="${s.icon}"></i> ${s.label}</a>`;
    }
  });

  // --- Cities ---
  const citiesHtml = (data.presence || []).map(c =>
    `<span class="previewCityChip"><i class="fa-solid fa-location-crosshairs"></i> ${escHtml(c.city)}<span class="previewCityCoords">${c.top ? ` (${c.top}, ${c.left})` : ''}</span></span>`
  ).join("") || `<span class="previewEmpty">No cities added.</span>`;

  // --- State Info ---
  let stateInfoHtml = "";
  if (data.presenceSection?.stateInfo) {
    const lines = data.presenceSection.stateInfo.split("\n").filter(l => l.trim());
    stateInfoHtml = lines.map(l => `<div class="previewStateRow">${escHtml(l)}</div>`).join("");
  }

  container.innerHTML = `
  <div class="previewWrapper">

    <div class="previewHeader">
      <i class="fa-solid fa-database"></i>&nbsp; Live Home Data Preview
      <span class="previewBadge"><i class="fa-solid fa-circle-dot"></i> Synced</span>
    </div>

    <!-- ===== NAVBAR ===== -->
    ${data.navbar?.logo ? `
    <div class="previewBlock">
      <div class="previewBlockTitle"><i class="fa-solid fa-image"></i> Navbar Logo</div>
      <img class="previewLogoImg" src="http://zirconhome.onrender.com/${data.navbar.logo}" alt="Logo">
      <div class="previewActions" style="margin-top:10px;">
        <button class="previewEditBtn" onclick="scrollAndFocus('navbarLogo')"><i class="fa-solid fa-pen"></i> Edit Logo</button>
      </div>
    </div>` : ''}

    <!-- ===== HERO SLIDES ===== -->
    <div class="previewBlock">
      <div class="previewBlockTitle"><i class="fa-solid fa-images"></i> Hero Slides <span class="previewCount">${data.heroSlides?.length || 0}</span></div>
      ${slidesHtml}
      <button class="previewAddBtn" onclick="scrollAndFocus('addSlideBtn')"><i class="fa-solid fa-plus"></i> Add New Slide</button>
    </div>

    <!-- ===== ABOUT ===== -->
    <div class="previewBlock">
      <div class="previewBlockTitle"><i class="fa-solid fa-address-card"></i> About Section</div>
      <div class="previewRow"><span class="previewLabel">Title:</span> ${escHtml(data.about?.title || '—')}</div>
      <div class="previewRow"><span class="previewLabel">Subtitle:</span> ${escHtml(data.about?.subTitle || '—')}</div>
      <div class="previewRow previewDesc">${escHtml(data.about?.description || '—')}</div>
      ${data.about?.image ? `<img src="http://zirconhome.onrender.com/${data.about.image}" class="previewAboutImg">` : ''}
      <div class="previewActions" style="margin-top:10px;">
        <button class="previewEditBtn" onclick="scrollAndFocus('aboutTitle')"><i class="fa-solid fa-pen"></i> Edit About</button>
      </div>
    </div>

    <!-- ===== STATS ===== -->
    <div class="previewBlock">
      <div class="previewBlockTitle"><i class="fa-solid fa-chart-bar"></i> Stats <span class="previewCount">${data.stats?.length || 0}</span></div>
      <div class="previewRow"><span class="previewLabel">Section Title:</span> ${escHtml(data.statsSection?.title || '—')}</div>
      ${statsHtml}
      <button class="previewAddBtn" style="margin-top:10px;" onclick="scrollAndFocus('addStatBtn')"><i class="fa-solid fa-plus"></i> Add New Stat</button>
    </div>

    <!-- ===== PARTIES ===== -->
    <div class="previewBlock">
      <div class="previewBlockTitle"><i class="fa-solid fa-handshake"></i> Parties & Partners <span class="previewCount">${data.parties?.length || 0}</span></div>
      <div class="previewRow"><span class="previewLabel">Title:</span> ${escHtml(data.partiesSection?.title || '—')}</div>
      ${partiesHtml}
      <button class="previewAddBtn" style="margin-top:10px;" onclick="scrollAndFocus('addPartyBtn')"><i class="fa-solid fa-plus"></i> Add New Party</button>
    </div>

    <!-- ===== PRESENCE ===== -->
    <div class="previewBlock">
      <div class="previewBlockTitle"><i class="fa-solid fa-location-dot"></i> Presence Section</div>
      <div class="previewRow"><span class="previewLabel">Title:</span> ${escHtml(data.presenceSection?.title || '—')}</div>
      <div class="previewCitiesGrid">${citiesHtml}</div>
      ${stateInfoHtml ? `<div class="previewStateInfo" style="margin-top:10px;">${stateInfoHtml}</div>` : ''}
      <div class="previewActions" style="margin-top:10px;">
        <button class="previewEditBtn" onclick="scrollAndFocus('presenceTitle')"><i class="fa-solid fa-pen"></i> Edit Presence</button>
        <button class="previewAddBtn" onclick="scrollAndFocus('addPresenceBtn')"><i class="fa-solid fa-plus"></i> Add City</button>
      </div>
    </div>

    <!-- ===== FOOTER ===== -->
    <div class="previewBlock">
      <div class="previewBlockTitle"><i class="fa-solid fa-shoe-prints"></i> Footer</div>
      <div class="previewRow"><span class="previewLabel">Main Title:</span> ${escHtml(footer.mainTitle || '—')}</div>
      <div class="previewRow"><span class="previewLabel">Small Title:</span> ${escHtml(footer.smallTitle || '—')}</div>
      <div class="previewRow previewDesc">${escHtml(footer.description || '—')}</div>
      <div class="previewRow"><span class="previewLabel">Button:</span> ${escHtml(footer.projectBtnText || '—')} → ${escHtml(footer.projectBtnLink || '—')}</div>

      ${socialHtml ? `<div class="previewSocialRow">${socialHtml}</div>` : ''}

      <div class="previewFooterLinksGrid">
        <div class="previewFooterCol"><div class="previewFooterColTitle">Column 1</div>${flHtml[1] || '<span class="previewEmpty">—</span>'}</div>
        <div class="previewFooterCol"><div class="previewFooterColTitle">Column 2</div>${flHtml[2] || '<span class="previewEmpty">—</span>'}</div>
        <div class="previewFooterCol"><div class="previewFooterColTitle">Column 3</div>${flHtml[3] || '<span class="previewEmpty">—</span>'}</div>
        <div class="previewFooterCol"><div class="previewFooterColTitle">Column 4</div>${flHtml[4] || '<span class="previewEmpty">—</span>'}</div>
      </div>
      <div class="previewActions" style="margin-top:10px;">
        <button class="previewEditBtn" onclick="scrollAndFocus('footerTopSmallTitle')"><i class="fa-solid fa-pen"></i> Edit Footer</button>
      </div>
      <div class="previewCopyright">${escHtml(footer.copyright || '—')}</div>
    </div>

  </div>`;
}

// =====================================================
// PREVIEW HELPER FUNCTIONS
// =====================================================

// Scroll to any element by ID and highlight it
function scrollAndFocus(id) {
  const el = $(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.focus();
  el.style.outline = "3px solid #F47A20";
  el.style.boxShadow = "0 0 0 4px rgba(244,122,32,0.18)";
  setTimeout(() => { el.style.outline = ""; el.style.boxShadow = ""; }, 2500);
}

// Load slide data into form for editing
function editSlideInForm(idx) {
  scrollAndFocus("slidesContainer");
  setTimeout(() => {
    const cards = document.querySelectorAll("#slidesContainer .slideCard");
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: "smooth", block: "center" });
      cards[idx].style.outline = "3px solid #F47A20";
      cards[idx].style.boxShadow = "0 0 0 4px rgba(244,122,32,0.18)";
      setTimeout(() => { cards[idx].style.outline = ""; cards[idx].style.boxShadow = ""; }, 2500);
    }
  }, 400);
}

// Load stat into form for editing
function editStatInForm(idx) {
  scrollAndFocus("statsContainer");
  setTimeout(() => {
    const cards = document.querySelectorAll("#statsContainer .statCard");
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: "smooth", block: "center" });
      cards[idx].style.outline = "3px solid #F47A20";
      cards[idx].style.boxShadow = "0 0 0 4px rgba(244,122,32,0.18)";
      setTimeout(() => { cards[idx].style.outline = ""; cards[idx].style.boxShadow = ""; }, 2500);
    }
  }, 400);
}

// Load party into form for editing
function editPartyInForm(idx) {
  scrollAndFocus("partiesContainer");
  setTimeout(() => {
    const cards = document.querySelectorAll("#partiesContainer .partyCard");
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: "smooth", block: "center" });
      cards[idx].style.outline = "3px solid #F47A20";
      cards[idx].style.boxShadow = "0 0 0 4px rgba(244,122,32,0.18)";
      setTimeout(() => { cards[idx].style.outline = ""; cards[idx].style.boxShadow = ""; }, 2500);
    }
  }, 400);
}

// Delete slide directly from preview (calls API)
function deleteSlideFromPreview(id, idx) {
  if (!confirm("Delete this slide from database?")) return;
  if (id && id !== "undefined") {
    fetch(`http://zirconhome.onrender.com/api/home/hero/${id}`, { method: "DELETE" })
      .then(r => r.json())
      .then(res => {
        if (res.success) { showToast("✅ Slide deleted!", "success"); loadHome(); }
        else showToast("❌ Delete failed", "error");
      }).catch(() => showToast("❌ Connection error", "error"));
  } else {
    state.slides.splice(idx, 1);
    renderSlides();
    showToast("✅ Slide removed", "success");
    loadHome();
  }
}

// Delete party directly from preview (calls API)
function deletePartyFromPreview(id, idx) {
  if (!confirm("Delete this party from database?")) return;
  if (id && id !== "undefined") {
    fetch(`http://zirconhome.onrender.com/api/home/party/${id}`, { method: "DELETE" })
      .then(r => r.json())
      .then(res => {
        if (res.success) { showToast("✅ Party deleted!", "success"); loadHome(); }
        else showToast("❌ Delete failed", "error");
      }).catch(() => showToast("❌ Connection error", "error"));
  } else {
    state.parties.splice(idx, 1);
    renderParties();
    showToast("✅ Party removed", "success");
    loadHome();
  }
}

// Delete stat from preview (local state only — save to persist)
function deleteStatLocal(idx) {
  if (!confirm("Delete this stat? (Save the form to apply to database)")) return;
  captureStatsData();
  state.stats.splice(idx, 1);
  renderStats();
  showToast("⚠️ Stat removed from form. Click Save to update database.", "success");
  // Refresh preview with local state
  const fakeData = buildFakeData();
  renderDataPreview(fakeData);
}

// Build a fake data object from current state for preview refresh after local edits
function buildFakeData() {
  return {
    navbar: { logo: $("navbarLogoPreview")?.src?.replace("http://zirconhome.onrender.com/", "") || "" },
    heroSlides: state.slides,
    about: {
      title: $("aboutTitle")?.value || "",
      subTitle: $("aboutSubTitle")?.value || "",
      description: $("aboutDescription")?.value || "",
      image: ""
    },
    statsSection: {
      title: $("statsTitle")?.value || "",
      subtitle: $("statsSubtitle")?.value || "",
      description: $("statsDescription")?.value || ""
    },
    stats: state.stats,
    partiesSection: {
      title: $("partiesTitle")?.value || "",
      subTitle: $("partiesSubTitle")?.value || ""
    },
    parties: state.parties,
    presenceSection: {
      title: $("presenceTitle")?.value || "",
      subTitle: $("presenceSubTitle")?.value || "",
      stateInfo: $("statePresence")?.value || ""
    },
    presence: state.presence.map(p => ({ city: p.city, top: p.lat, left: p.lng })),
    footer: {
      smallTitle: $("footerTopSmallTitle")?.value || "",
      mainTitle: $("footerTopMainTitle")?.value || "",
      description: $("footerDescription")?.value || "",
      projectBtnText: $("projectBtnText")?.value || "",
      projectBtnLink: $("projectBtnLink")?.value || "",
      facebook: $("facebook")?.value || "",
      twitter: $("twitter")?.value || "",
      instagram: $("instagram")?.value || "",
      linkedin: $("linkedin")?.value || "",
      youtube: $("youtube")?.value || "",
      copyright: $("copyrightText")?.value || "",
      links: state.footerLinks
    }
  };
}

// Logout function
function logout() {
  localStorage.removeItem("adminToken");
  window.location.href = "adminlogin.html";
} 