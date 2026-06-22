const token = localStorage.getItem("adminToken");
const sectionSelect = document.getElementById("section");
const statsFields = document.getElementById("statsFields");

sectionSelect.addEventListener("change", () => {
  if (sectionSelect.value === "stats") {
    statsFields.style.display = "block";
  } else {
    statsFields.style.display = "none";
  }
});
// ================= LOAD DATA =================
// ================= LOAD DATA =================

async function loadAbout() {

  const res = await fetch("http://localhost:5000/api/about");

  const data = await res.json();

  console.log("ADMIN DATA 👉", data);

  const container = document.getElementById("aboutList");

  container.innerHTML = "";

  const grouped = {};

  data.forEach(item => {

    if (!grouped[item.section]) {
      grouped[item.section] = [];
    }

    grouped[item.section].push(item);

  });

  for (let section in grouped) {

    const sectionDiv = document.createElement("div");
    const cardsWrap = document.createElement("div");

if (
  section === "mission" ||
  section === "why"
){
  cardsWrap.className = "about-section-grid";
  cardsWrap.style.gridTemplateColumns =
  "repeat(2,minmax(0,1fr))";
}
else if(section === "certification"){

  cardsWrap.className =
  "about-section-grid certification-grid";

}
else{
  cardsWrap.className = "about-section-grid";
  cardsWrap.style.gridTemplateColumns =
  "1fr";
}

    sectionDiv.innerHTML = `
      <h2 style="color:#F47A20; margin-top:20px;">
        ${section.toUpperCase()}
      </h2>
    `;

grouped[section].forEach(item => {

cardsWrap.innerHTML += `

<div class="about-item-card ${
  section === "about" ? "about-full-card" : ""
}">

${
item.image
?
`
<div class="about-image-box">

<img src="http://localhost:5000${item.image}">

${
section === "about"
?
`
<div class="about-image-actions">

<button onclick='editData(
${JSON.stringify(item._id)},
${JSON.stringify(item.section)},
${JSON.stringify(item.title || "")},
${JSON.stringify(item.description || "")},
${JSON.stringify(item.icon || "")}
)'>
Edit
</button>

<button onclick="deleteData('${item._id}')">
Delete
</button>

</div>
`
:
""
}

</div>
`
:
section === "certification"
?
`
<div class="about-image-box certification-empty"></div>
`
:
""
}
  <div class="about-content">

    ${
      section !== "stats"

      ?

      `
      <h3>
        ${item.title || "No Title"}
      </h3>

      <p>
        ${item.description || "No Description"}
      </p>
      `

      :

      `
      <div class="stats-grid">

        ${item.stats.map(stat => `

          <div class="stat-box">

            <h4>${stat.value}</h4>

            <span>${stat.title}</span>

          </div>

        `).join("")}

      </div>
      `
    }

${
section !== "about"
?
`
<div class="about-actions">

  ${
    section === "stats"
      ?
      `
      <button onclick='editStats(${JSON.stringify(item)})'>
        Edit
      </button>
      `
      :
      `
      <button onclick='editData(
      ${JSON.stringify(item._id)},
      ${JSON.stringify(item.section)},
      ${JSON.stringify(item.title || "")},
      ${JSON.stringify(item.description || "")},
      ${JSON.stringify(item.icon || "")}
      )'>
        Edit
      </button>
      `
  }

  <button onclick="deleteData('${item._id}')">
    Delete
  </button>

</div>
`
:
""
}

  </div>

</div>
`;

    });

   sectionDiv.appendChild(cardsWrap);
container.appendChild(sectionDiv);

  }

}

loadAbout();

// ================= EDIT STATS =================
function editStats(item) {

  document.getElementById("aboutId").value = item._id;

  document.getElementById("section").value = "stats";

  statsFields.style.display = "block";

  document.getElementById("s1title").value =
    item.stats[0]?.title || "";

  document.getElementById("s1value").value =
    item.stats[0]?.value || "";

  document.getElementById("s2title").value =
    item.stats[1]?.title || "";

  document.getElementById("s2value").value =
    item.stats[1]?.value || "";

  document.getElementById("s3title").value =
    item.stats[2]?.title || "";

  document.getElementById("s3value").value =
    item.stats[2]?.value || "";

  document.getElementById("s4title").value =
    item.stats[3]?.title || "";

  document.getElementById("s4value").value =
    item.stats[3]?.value || "";
}

// ================= EDIT NORMAL DATA =================
function editData(id, section, title, description, icon) {

  document.getElementById("aboutId").value = id;

  document.getElementById("section").value = section;

  document.getElementById("title").value = title;

  document.getElementById("description").value = description;

  document.getElementById("icon").value = icon;

  // HIDE stats if not stats section
  if (section !== "stats") {
    statsFields.style.display = "none";
  }

  // Scroll top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

// ================= DELETE =================
async function deleteData(id) {
  if (!confirm("Delete this item?")) return;

  await fetch("http://localhost:5000/api/about/" + id, {
    method: "DELETE",
    headers: {
      
  Authorization: "Bearer " + token
}
    
  });

  loadAbout();
}

// ================= ADD / UPDATE =================
// ================= ADD / UPDATE =================

document.getElementById("aboutForm")
.addEventListener("submit", async (e) => {

  e.preventDefault();

  const id = document.getElementById("aboutId").value;

  const section = document.getElementById("section").value;

  // ================= STATS SAVE =================

  if (section === "stats") {

    const statsData = {

      section: "stats",

      stats: [

        {
          title: document.getElementById("s1title").value,
          value: document.getElementById("s1value").value
        },

        {
          title: document.getElementById("s2title").value,
          value: document.getElementById("s2value").value
        },

        {
          title: document.getElementById("s3title").value,
          value: document.getElementById("s3value").value
        },

        {
          title: document.getElementById("s4title").value,
          value: document.getElementById("s4value").value
        }

      ]

    };

    let url = "http://localhost:5000/api/about";

    let method = "POST";

    // UPDATE

    if (id) {

      url = `http://localhost:5000/api/about/${id}`;

      method = "PUT";

    }

    await fetch(url, {

      method,

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },

      body: JSON.stringify(statsData)

    });

    alert("Stats Saved Successfully");

    document.getElementById("aboutForm").reset();

    document.getElementById("aboutId").value = "";

    statsFields.style.display = "none";

    loadAbout();

    return;

  }

  // ================= NORMAL DATA =================

  const formData = new FormData();

  formData.append("section", section);

  formData.append("title", document.getElementById("title").value);

  formData.append("description", document.getElementById("description").value);

  formData.append("icon", document.getElementById("icon").value);

  const file = document.getElementById("image").files[0];

  if (file) {

    formData.append("image", file);

  }

  let url = "http://localhost:5000/api/about";

  let method = "POST";

  // UPDATE

  if (id) {

    url = `http://localhost:5000/api/about/${id}`;

    method = "PUT";

  }

  await fetch(url, {

    method,

    headers: {
      Authorization: "Bearer " + token
    },

    body: formData

  });

  alert("Saved Successfully");

  document.getElementById("aboutForm").reset();

  document.getElementById("aboutId").value = "";

  loadAbout();

});

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
