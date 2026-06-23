const api =
"https://zirconhome.onrender.com/api/electricalplumbing";

const form =
document.getElementById("electricalplumbingForm");

const list =
document.getElementById("electricalplumbingList");


// ==========================
// LOAD DATA
// ==========================
async function loadData() {

    const res = await fetch(api);

    const data = await res.json();

    list.innerHTML = "";

 data.forEach(item => {

    list.innerHTML += `

    <div class="service-card">

        <p>
            <strong>Main Heading:</strong>
            ${item.mainHeading}
        </p>

        <p>
            <strong>Main Description:</strong>
            ${item.mainDescription}
        </p>

        <p>
            <strong>Icon:</strong>
            ${item.icon}
        </p>

        <p>
            <strong>Title:</strong>
            ${item.title}
        </p>

        <p>
            <strong>Description:</strong>
            ${item.description}
        </p>

        <p>
          <strong>View Electrical Works:</strong>
${item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </p>

        <div class="card-btns">

            <button
                class="edit-btn"
                onclick="editData('${item._id}')"
            >
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteData('${item._id}')"
            >
                Delete
            </button>

        </div>

    </div>

    `;

});

}

loadData();


// ==========================
// SAVE
// ==========================
form.addEventListener("submit",

async (e) => {

    e.preventDefault();

    const editId =
    document.getElementById("editId").value;

    const data = {

        mainHeading:
        document.getElementById("mainHeading").value,

        mainDescription:
        document.getElementById("mainDescription").value,

        icon:
        document.getElementById("icon").value,

        title:
        document.getElementById("title").value,

        description:
        document.getElementById("description").value,

        type:
        document.getElementById("type").value

    };

    // UPDATE
    if(editId){

        await fetch(`${api}/${editId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

    }

    // ADD
    else{

        await fetch(api, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

    }

    form.reset();

    document.getElementById("editId").value = "";

    loadData();

});


// ==========================
// DELETE
// ==========================
async function deleteData(id){

    if(confirm("Delete this service?")){

        await fetch(`${api}/${id}`, {
            method: "DELETE"
        });

        loadData();

    }

}


// ==========================
// EDIT
// ==========================
async function editData(id){

    const res = await fetch(api);

    const data = await res.json();

    const item = data.find(d => d._id === id);

    document.getElementById("editId").value =
    item._id;

    document.getElementById("mainHeading").value =
    item.mainHeading;

    document.getElementById("mainDescription").value =
    item.mainDescription;

    document.getElementById("icon").value =
    item.icon;

    document.getElementById("title").value =
    item.title;

    document.getElementById("description").value =
    item.description;

    document.getElementById("type").value =
    item.type;

}

// DROPDOWN
// =========================

const dropdowns =
document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {

const arrow =
dropdown.querySelector(".dropdown-btn");

arrow.addEventListener("click", (e) => {

e.stopPropagation();

dropdown.classList.toggle("active");

});

});
