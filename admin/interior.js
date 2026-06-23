const form = document.getElementById("interiorForm");

const interiorList =
document.getElementById("interiorList");



let editId = null;


const imageInput =
document.getElementById("images");

const addMoreBtn =
document.getElementById("addMoreBtn");

const imageDetailsContainer =
document.getElementById("imageDetailsContainer");


// FIRST INPUT
imageInput.addEventListener("change", () => {

  const files =
  Array.from(imageInput.files);

  files.forEach(file => {

    createImageBox(file);

  });

});


// ADD MORE
addMoreBtn.addEventListener("click", () => {

  const newInput =
  document.createElement("input");

  newInput.type = "file";

  newInput.accept = "image/*";

  newInput.click();


  newInput.addEventListener("change", () => {

    const file =
    newInput.files[0];

    if(file){

      createImageBox(file);

    }

  });

});



// CREATE BOX
function createImageBox(file){

  const box =
  document.createElement("div");

  box.className = "imgDetailBox";

  box.innerHTML = `

    <button
      type="button"
      class="removeBtn"
    >
      ✖
    </button>

    <div class="fileName">
      ${file.name}
    </div>

    <input
      type="text"
      class="imgTitle"
      placeholder="Image Title"
    >

    <textarea
      class="imgText"
      placeholder="Image Description"
    ></textarea>

  `;


  // SAVE FILE
  box.file = file;


  // DELETE
  box.querySelector(".removeBtn")
  .addEventListener("click", () => {

    box.remove();

  });


  imageDetailsContainer.appendChild(box);

}

// LOAD
async function loadInteriorWorks() {

  const res = await fetch(
    "http://zirconhome.onrender.com/api/interior"
  );

  const data = await res.json();

  interiorList.innerHTML = "";

  data.data.forEach(item => {

  interiorList.innerHTML += `

  <div class="interiorDataCard">

    <!-- TOP CONTENT -->
    <div class="topContent">

      <div class="dataField">
        <strong>Main Heading :</strong>
        ${item.mainHeading || ""}
      </div>

      <div class="dataField">
        <strong>Main Description :</strong>
        ${item.mainDescription || ""}
      </div>

      <div class="dataField">
        <strong>Section Title :</strong>
        ${item.sectionTitle || ""}
      </div>

      <div class="dataField">
        <strong>Purpose :</strong>
        ${item.purpose || ""}
      </div>

      <div class="dataField">
        <strong>Material Used :</strong>
        ${item.materialUsed || ""}
      </div>

      <div class="dataField">
        <strong>Advantages :</strong>
        ${item.advantages || ""}
      </div>

    </div>

    <!-- IMAGE GRID -->
    <div class="imagePreview">

      ${item.imageDetails.map(img => `

        <div class="previewCard">

          <img
            src="http://zirconhome.onrender.com${img.image}"
          >

          <h4>${img.title || ""}</h4>

          <p>${img.text || ""}</p>

        </div>

      `).join("")}

    </div>

    <!-- ONLY ONE BUTTON SECTION -->
    <div class="mainActions">

      <button
        class="editBtn"
        onclick="editInterior('${item._id}')"
      >
        Edit
      </button>

      <button
        class="deleteBtn"
        onclick="deleteInterior('${item._id}')"
      >
        Delete
      </button>

    </div>

  </div>

  `;
});
}



// ADD / UPDATE
form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const formData = new FormData();

  formData.append(
    "sectionTitle",
    document.getElementById("sectionTitle").value
  );

  formData.append(
    "purpose",
    document.getElementById("purpose").value
  );

  formData.append(
    "materialUsed",
    document.getElementById("materialUsed").value
  );

  formData.append(
    "advantages",
    document.getElementById("advantages").value
  );
formData.append(
  "mainHeading",
  document.getElementById("mainHeading").value
);

formData.append(
  "mainDescription",
  document.getElementById("mainDescription").value
);


// new chanegs for edit and save 
document.querySelectorAll(".imgDetailBox")
.forEach(box => {

  if(box.file){
    formData.append(
      "images",
      box.file
    );
  }

  formData.append(
    "imageTitles",
    box.querySelector(".imgTitle").value
  );

  formData.append(
    "imageTexts",
    box.querySelector(".imgText").value
  );

});



  let url =
  "http://zirconhome.onrender.com/api/interior/add";

  let method = "POST";


  if(editId){

    url =
    `http://zirconhome.onrender.com/api/interior/${editId}`;

    method = "PUT";

  }


  await fetch(url, {
    method,
    body: formData
  });


  form.reset();

  imageDetailsContainer.innerHTML = "";

  editId = null;

  loadInteriorWorks();

});



// DELETE
async function deleteInterior(id){

  await fetch(
    `http://zirconhome.onrender.com/api/interior/${id}`,
    {
      method:"DELETE"
    }
  );

  loadInteriorWorks();
}



// EDIT
async function editInterior(id){

  const res = await fetch(
    "http://zirconhome.onrender.com/api/interior"
  );

  const data = await res.json();

  const item =
  data.data.find(x => x._id === id);


  // TEXT FIELDS
  document.getElementById("mainHeading").value =
  item.mainHeading || "";

  document.getElementById("mainDescription").value =
  item.mainDescription || "";

  document.getElementById("sectionTitle").value =
  item.sectionTitle || "";

  document.getElementById("purpose").value =
  item.purpose || "";

  document.getElementById("materialUsed").value =
  item.materialUsed || "";

  document.getElementById("advantages").value =
  item.advantages || "";


  // CLEAR OLD BOXES
  imageDetailsContainer.innerHTML = "";


  // IMAGE DETAILS LOAD
  item.imageDetails.forEach(img => {

    const box =
    document.createElement("div");

    box.className = "imgDetailBox";

    box.innerHTML = `

      <button
        type="button"
        class="removeBtn"
      >
        ✖
      </button>

      <div class="fileName">

        <img
          src="http://zirconhome.onrender.com${img.image}"
          style="
            width:120px;
            height:80px;
            object-fit:cover;
            border-radius:8px;
            margin-bottom:10px;
            border:1px solid #ddd;
          "
        >

      </div>

      <input
        type="text"
        class="imgTitle"
        placeholder="Image Title"
        value="${img.title || ""}"
      >

      <textarea
        class="imgText"
        placeholder="Image Description"
      >${img.text || ""}</textarea>

    `;


    // IMPORTANT
    box.oldImage = img.image;


    box.querySelector(".removeBtn")
    .addEventListener("click", () => {

      box.remove();

    });

    imageDetailsContainer.appendChild(box);

  });


  editId = id;

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


loadInteriorWorks();

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
