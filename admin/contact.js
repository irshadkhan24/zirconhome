const api = "http://zirconhome.onrender.com/api/contact";
const form = document.getElementById("contactForm");
const list = document.getElementById("contactList");

let editId = null;

// LOAD
async function loadContacts() {
  const res = await fetch(api);
  const data = await res.json();

  list.innerHTML = "";

  data.forEach(c => {
    list.innerHTML += `
  <div class="contact-card">

    <h3>${c.companyName}</h3>

    <p><strong>Heading:</strong> ${c.heading || "-"}</p>
    <p><strong>Subheading:</strong> ${c.subheading || "-"}</p>

    <p><strong>Title:</strong> ${c.title || "-"}</p>
    <p><strong>Full Address:</strong> ${c.address || "-"}</p>

    <p><strong>Phone:</strong> ${c.phone || "-"}</p>
    <p><strong>Email:</strong> ${c.email || "-"}</p>
    <p><strong>Timing:</strong> ${c.timing || "-"}</p>

    <p><strong>WhatsApp:</strong> ${c.whatsapp || "-"}</p>
    <p><strong>Map:</strong> ${c.mapLink || "-"}</p>

    <button onclick='editContact(${JSON.stringify(c)})'>Edit</button>
    <button onclick="deleteContact('${c._id}')">Delete</button>

  </div>
`;
  });
}

loadContacts();

// SUBMIT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
  heading: heading.value,
  subheading: subheading.value,
  title: title.value,

  companyName: companyName.value,
  address: address.value,
  phone: phone.value,
  email: email.value,
  timing: timing.value,
  whatsapp: whatsapp.value,
  mapLink: mapLink.value
};
  if (editId) {
    await fetch(api + "/" + editId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken")
      },
      body: JSON.stringify(body)
    });
  } else {
    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       Authorization: "Bearer " + localStorage.getItem("adminToken")
      },
      body: JSON.stringify(body)
    });
  }

  form.reset();
  editId = null;
  loadContacts();
});

// DELETE
async function deleteContact(id) {
  await fetch(api + "/" + id, {
    method: "DELETE",
    headers: { 
  Authorization: "Bearer " + localStorage.getItem("adminToken") 
}
  });
  loadContacts();
}

// EDIT
function editContact(c) {
  editId = c._id;

  document.getElementById("heading").value = c.heading || "";
  document.getElementById("subheading").value = c.subheading || "";
  document.getElementById("title").value = c.title || "";

  companyName.value = c.companyName || "";
  address.value = c.address || "";
  phone.value = c.phone || "";
  email.value = c.email || "";
  timing.value = c.timing || "";
  whatsapp.value = c.whatsapp || "";
  mapLink.value = c.mapLink || "";
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
