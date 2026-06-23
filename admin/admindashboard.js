// =========================
// TOKEN CHECK
// =========================

const token = localStorage.getItem("adminToken");

if(!token){

window.location.href = "admin.html";

}

// =========================
// LOAD DASHBOARD
// =========================

async function loadDashboard(){

try{

// TESTIMONIALS

const res = await fetch(
"http://zirconhome.onrender.com/api/testimonials"
);

const data = await res.json();

document.getElementById(
"totalTestimonials"
).innerText = data.length;


// PARTIES

const res2 = await fetch(
"https://zirconhome.onrender.com/api/parties"
);

const parties = await res2.json();

document.getElementById(
"totalParties"
).innerText = parties.length;


// COMPLETED

const res4 = await fetch(
"http://zirconhome.onrender.com/api/complete"
);

const completes = await res4.json();

document.getElementById(
"totalcompletes"
).innerText = completes.length;


// ONGOING

const res5 = await fetch(
"http://zirconhome.onrender.com/api/ongoing"
);

const ongoings = await res5.json();

document.getElementById(
"totalongoings"
).innerText = ongoings.length;


// CIVIL

const civilRes = await fetch(
"http://zirconhome.onrender.com/api/civil"
);

const civilData = await civilRes.json();


// INTERIOR

const interiorRes = await fetch(
"http://zirconhome.onrender.com/api/interior"
);

const interiorData = await interiorRes.json();


// EXTERIOR

const exteriorRes = await fetch(
"http://zirconhome.onrender.com/api/exterior"
);

const exteriorData = await exteriorRes.json();


// RENOVATION

const renovationRes = await fetch(
"http://zirconhome.onrender.com/api/renovation"
);

const renovationData = await renovationRes.json();


// ELECTRICAL

const electricalRes = await fetch(
"http://zirconhome.onrender.com/api/electrical"
);

const electricalData = await electricalRes.json();


// PLUMBING

const plumbingRes = await fetch(
"http://zirconhome.onrender.com/api/plumbing"
);

const plumbingData = await plumbingRes.json();


// TOTAL SERVICES

const totalServices =

civilData.data.length +

interiorData.data.length +

exteriorData.data.length +

renovationData.data.length +

electricalData.data.length +

plumbingData.data.length;


// SHOW TOTAL SERVICES

document.getElementById(
"totalServices"
).innerText = totalServices;


// INDIVIDUAL COUNTS

document.getElementById(
"civilCount"
).innerText = civilData.data.length;

document.getElementById(
"interiorCount"
).innerText = interiorData.data.length;

document.getElementById(
"exteriorCount"
).innerText = exteriorData.data.length;

document.getElementById(
"renovationCount"
).innerText = renovationData.data.length;

document.getElementById(
"electricalCount"
).innerText = electricalData.data.length;

document.getElementById(
"plumbingCount"
).innerText = plumbingData.data.length;

}catch(err){

console.log(err);

}

}

loadDashboard();


// =========================
// LOGOUT
// =========================

function logout(){

localStorage.removeItem(
"adminToken"
);

window.location.href =
"admin.html";

}


// =========================
// DROPDOWN
// =========================

const dropdowns =
document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {

const arrow =
dropdown.querySelector(".dropdown-toggle");

arrow.addEventListener("click", (e) => {

e.stopPropagation();

dropdown.classList.toggle("active");

});

});


// =========================
// CARD ENTRY ANIMATION
// =========================

const animatedCards = document.querySelectorAll(
".summaryCard, .cardBox"
);

const cardObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.2
});

animatedCards.forEach(card => {

cardObserver.observe(card);

});