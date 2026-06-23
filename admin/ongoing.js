const API = "https://zirconhome.onrender.com/api/ongoing";

let editId = null;


// ================= LOAD =================

async function loadProjects() {

  try {

    const res = await fetch(API);

    const data = await res.json();

    const ongoing =
      data.filter(p => p.status === "ongoing");

    const list =
      document.getElementById("projectsList");

    list.innerHTML = "";

    ongoing.forEach(project => {




list.innerHTML += `

<div class="project-item">

<img src="https://zirconhome.onrender.com/uploads/${project.image}" alt="project">

<div class="project-content">

<h3>${project.title}</h3>

<p><b>Location:</b> ${project.location}</p>

<p><b>Details:</b> ${project.details}</p>

<p><b>Works:</b> ${project.works}</p>

<p><b>Cost:</b> ${project.cost}</p>

<div class="actions">

<button class="edit-btn"
onclick="editProject('${project._id}')">
Edit
</button>

<button class="delete-btn"
onclick="deleteProject('${project._id}')">
Delete
</button>

</div>

</div>

</div>

`;









    });

  } catch (err) {

    console.log(err);

  }

}

loadProjects();


// ================= ADD / UPDATE =================

async function addProject() {

  const formData = new FormData();

  formData.append(
    "title",
    document.getElementById("title").value
  );

  formData.append(
    "location",
    document.getElementById("location").value
  );

  formData.append(
    "details",
    document.getElementById("details").value
  );

  formData.append(
    "works",
    document.getElementById("works").value
  );

  formData.append(
    "cost",
    document.getElementById("cost").value
  );

  formData.append(
    "status",
    "ongoing"
  );

  const imageFile =
    document.getElementById("image").files[0];

  if (imageFile) {

    formData.append("image", imageFile);

  }

  try {

    if (editId) {

      await fetch(`${API}/${editId}`, {

        method: "PUT",
        body: formData

      });

      editId = null;

    } else {

      await fetch(API, {

        method: "POST",
        body: formData

      });

    }

    clearForm();

    loadProjects();

  } catch (err) {

    console.log(err);

  }

}


// ================= EDIT =================

async function editProject(id) {

  const res = await fetch(API);

  const data = await res.json();

  const project =
    data.find(p => p._id === id);

  document.getElementById("title").value =
    project.title;

  document.getElementById("location").value =
    project.location;

  document.getElementById("details").value =
    project.details;

  document.getElementById("works").value =
    project.works;

  document.getElementById("cost").value =
    project.cost;

  editId = id;

}


// ================= DELETE =================

async function deleteProject(id) {

  await fetch(`${API}/${id}`, {

    method: "DELETE"

  });

  loadProjects();

}


// ================= CLEAR =================

function clearForm() {

  document.getElementById("title").value = "";

  document.getElementById("location").value = "";

  document.getElementById("details").value = "";

  document.getElementById("works").value = "";

  document.getElementById("cost").value = "";

  document.getElementById("image").value = "";

}

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