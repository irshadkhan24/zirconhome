const API = "https://zirconhome.onrender.com/api/projects";

const form = document.getElementById("projectForm");

const projectList = document.getElementById("projectList");

let editId = null;


// LOAD PROJECTS

async function loadProjects() {

    try {

        const res = await fetch(API);

        const data = await res.json();

        projectList.innerHTML = "";
        data.forEach(project => {

            projectList.innerHTML += `

<div class="project-card">

<div class="project-card-content">

<p>
<b>Hero Title:</b>
${project.heroTitle}
</p>



<p>
<b>Hero Description:</b>
${project.heroDescription}
</p>



<p>
<b>Complete Button:</b>
${project.completeBtn}
</p>



<p>
<b>Ongoing Button:</b>
${project.ongoingBtn}
</p>



<p>
<b>Company Name:</b>
${project.title}
</p>



<p>
<b>Description:</b>
${project.description}
</p>

<div class="card-buttons">

<button
class="edit-btn"
onclick="editProject('${project._id}')">
Edit
</button>

<button
class="delete-btn"
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


// ADD / UPDATE

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const projectData = {

        heroTitle:
            document.getElementById("heroTitle").value,

        heroDescription:
            document.getElementById("heroDescription").value,

        completeBtn:
            document.getElementById("completeBtn").value,

        ongoingBtn:
            document.getElementById("ongoingBtn").value,

        title:
            document.getElementById("title").value,

        description:
            document.getElementById("description").value

    };

    try {

        if (editId) {

            await fetch(`${API}/${editId}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(projectData)

            });

            editId = null;

        } else {

            await fetch(API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(projectData)

            });

        }

        form.reset();

        loadProjects();

    } catch (err) {

        console.log(err);

    }

});


// DELETE

async function deleteProject(id) {

    try {

        await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        loadProjects();

    } catch (err) {

        console.log(err);

    }

}


// EDIT

async function editProject(id) {

    try {

        const res = await fetch(API);

        const data = await res.json();

        const project =
            data.find(p => p._id === id);

        document.getElementById("heroTitle").value =
            project.heroTitle;

        document.getElementById("heroDescription").value =
            project.heroDescription;

        document.getElementById("completeBtn").value =
            project.completeBtn;

        document.getElementById("ongoingBtn").value =
            project.ongoingBtn;

        document.getElementById("title").value =
            project.title;

        document.getElementById("description").value =
            project.description;

        editId = id;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (err) {

        console.log(err);

    }

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

