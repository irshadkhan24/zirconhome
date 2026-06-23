const API =
"http://zirconhome.onrender.com/api/services";

const form =
document.getElementById("serviceForm");

const servicesContainer =
document.getElementById("servicesContainer");

const whyContainer =
document.getElementById("whyContainer");

const previewBox =
document.getElementById("previewBox");

let savedData = null;



/* ADD SERVICE */

document.getElementById("addServiceBtn")
.onclick = () => {

createService();

};



/* ADD WHY */

document.getElementById("addWhyBtn")
.onclick = () => {

createWhy();

};



/* CREATE SERVICE */

function createService(data = {}) {

const div =
document.createElement("div");

div.className =
"serviceBox";

div.innerHTML = `

<button
type="button"
class="removeBtn">

×

</button>

<input
type="text"
class="title"
placeholder="Service Title"
value="${data.title || ""}">

<textarea
class="description"
placeholder="Description">${data.description || ""}</textarea>

<input
type="text"
class="icon"
placeholder="Icon"
value="${data.icon || ""}">

<input
type="text"
class="link"
placeholder="Link"
value="${data.link || ""}">

<input
type="text"
class="buttonText"
placeholder="Button Text"
value="${data.buttonText || ""}">

`;

div.querySelector(".removeBtn")
.onclick = () => {

div.remove();

renderPreview();

};

servicesContainer.appendChild(div);

bindInputs(div);

renderPreview();

}



/* CREATE WHY */

function createWhy(text = "") {

const div =
document.createElement("div");

div.className =
"whyBox";

div.innerHTML = `

<button
type="button"
class="removeBtn">

×

</button>

<input
type="text"
class="whyInput"
placeholder="Why Choose Point"
value="${text}">

`;

div.querySelector(".removeBtn")
.onclick = () => {

div.remove();

renderPreview();

};

whyContainer.appendChild(div);

bindInputs(div);

renderPreview();

}



/* BIND INPUT */

function bindInputs(parent){

parent.querySelectorAll("input,textarea")
.forEach(el => {

el.addEventListener(
"input",
renderPreview
);

});

}



/* ENABLE EDIT */

function enableEdit(){

if(!savedData) return;

/* HERO */

document.getElementById("heroTitle").value =
savedData.heroTitle || "";

document.getElementById("heroSubtitle").value =
savedData.heroSubtitle || "";

/* INTRO */

document.getElementById("introTitle").value =
savedData.introTitle || "";

document.getElementById("introDescription").value =
savedData.introDescription || "";

/* SERVICES */

servicesContainer.innerHTML = "";

(savedData.services || []).forEach(service => {

createService(service);

});

/* WHY */

whyContainer.innerHTML = "";

(savedData.whyChoose || []).forEach(item => {

createWhy(item);

});

}



/* DELETE */

async function deleteData(){

const confirmDelete =
confirm("Delete all service data?");

if(!confirmDelete) return;

try{

await fetch(API, {

method:"DELETE"

});

alert("Deleted Successfully");

location.reload();

}catch(err){

console.log(err);

}

}



/* PREVIEW */

function renderPreview() {

const services =
[...document.querySelectorAll(".serviceBox")];

const whys =
[...document.querySelectorAll(".whyBox")];

previewBox.innerHTML = `

<div class="fullPreviewCard">

<div class="previewSection">

<h3>Hero Section</h3>

<div class="dataCard">

<p>
<b>Hero Title:</b>
${document.getElementById("heroTitle").value}
</p>

<p>
<b>Hero Subtitle:</b>
${document.getElementById("heroSubtitle").value}
</p>

</div>

</div>

<div class="previewSection">

<h3>Intro Section</h3>

<div class="dataCard">

<p>
<b>Intro Title:</b>
${document.getElementById("introTitle").value}
</p>

<p>
<b>Intro Description:</b>
${document.getElementById("introDescription").value}
</p>

</div>

</div>

<div class="previewSection">

<h3>Services</h3>

${services.map(service => `

<div class="dataCard">

<p>
<b>Title:</b>
${service.querySelector(".title").value}
</p>

<p>
<b>Description:</b>
${service.querySelector(".description").value}
</p>

<p>
<b>Icon:</b>
${service.querySelector(".icon").value}
</p>

<p>
<b>Link:</b>
${service.querySelector(".link").value}
</p>

<p>
<b>Button Text:</b>
${service.querySelector(".buttonText").value}
</p>

</div>

`).join("")}

</div>

<div class="previewSection">

<h3>Why Choose</h3>

${whys.map(why => `

<div class="dataCard whyPreviewCard">

<p>
${why.querySelector(".whyInput").value}
</p>

</div>

`).join("")}

</div>

<div class="actionBtns">

<button
type="button"
class="editBtn"
onclick="enableEdit()">

Edit

</button>

<button
type="button"
class="deleteBtn"
onclick="deleteData()">

Delete

</button>

</div>

</div>

`;

}



/* LOAD DATA */

async function loadData(){

try{

const res =
await fetch(API);

const data =
await res.json();

if(!data) return;

savedData = data;

/* FORM EMPTY */

document.getElementById("heroTitle").value = "";

document.getElementById("heroSubtitle").value = "";

document.getElementById("introTitle").value = "";

document.getElementById("introDescription").value = "";

servicesContainer.innerHTML = "";

whyContainer.innerHTML = "";

/* SHOW SAVED DATA */

previewBox.innerHTML = `

<div class="fullPreviewCard">

<div class="previewSection">

<h3>Hero Section</h3>

<div class="dataCard">

<p><b>Hero Title:</b> ${data.heroTitle || ""}</p>

<p><b>Hero Subtitle:</b> ${data.heroSubtitle || ""}</p>

</div>

</div>

<div class="previewSection">

<h3>Intro Section</h3>

<div class="dataCard">

<p><b>Intro Title:</b> ${data.introTitle || ""}</p>

<p><b>Intro Description:</b> ${data.introDescription || ""}</p>

</div>

</div>

<div class="previewSection">

<h3>Services</h3>

${(data.services || []).map(service => `

<div class="dataCard">

<p><b>Title:</b> ${service.title}</p>

<p><b>Description:</b> ${service.description}</p>

<p><b>Icon:</b> ${service.icon}</p>

<p><b>Link:</b> ${service.link}</p>

<p><b>Button Text:</b> ${service.buttonText}</p>

</div>

`).join("")}

</div>

<div class="previewSection">

<h3>Why Choose</h3>

${(data.whyChoose || []).map(item => `

<div class="dataCard whyPreviewCard">

<p>${item}</p>

</div>

`).join("")}

</div>

<div class="actionBtns">

<button
type="button"
class="editBtn"
onclick="enableEdit()">

Edit

</button>

<button
type="button"
class="deleteBtn"
onclick="deleteData()">

Delete

</button>

</div>

</div>

`;

}catch(err){

console.log(err);

}

}



/* SAVE */

form.addEventListener(
"submit",
async (e) => {

e.preventDefault();

const services =
[...document.querySelectorAll(".serviceBox")]
.map(box => ({

title:
box.querySelector(".title").value,

description:
box.querySelector(".description").value,

icon:
box.querySelector(".icon").value,

link:
box.querySelector(".link").value,

buttonText:
box.querySelector(".buttonText").value

}));

const whyChoose =
[...document.querySelectorAll(".whyInput")]
.map(el => el.value);

const payload = {

heroTitle:
document.getElementById("heroTitle").value,

heroSubtitle:
document.getElementById("heroSubtitle").value,

introTitle:
document.getElementById("introTitle").value,

introDescription:
document.getElementById("introDescription").value,

services,

whyChoose

};

try{

await fetch(API, {

method:"PUT",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(payload)

});

alert("Updated Successfully");

loadData();

}catch(err){

console.log(err);

}

});



loadData();

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
