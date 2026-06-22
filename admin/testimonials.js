// TOKEN CHECK
const token = localStorage.getItem("adminToken");

if (!token) {
window.location.href = "admin.html";
}

// LOAD TESTIMONIALS
async function loadTestimonials(){

const res = await fetch("http://localhost:5000/api/testimonials");
const data = await res.json();

const container = document.getElementById("testimonialList");

container.innerHTML="";

data.forEach(t=>{

const div=document.createElement("div");

div.innerHTML=`

${t.image ? `<img src="http://localhost:5000${t.image}" width="100"><br>` : ""}

<strong>${t.name}</strong> ⭐ ${t.rating}/5

<p>${t.message}</p>

<p>
${t.projectName || ""} 
${t.location ? " | "+t.location : ""}
${t.year ? " | "+t.year : ""}
</p>

<button onclick="editTestimonial('${t._id}','${t.name}','${t.message}','${t.rating}','${t.projectName}','${t.location}','${t.year}')">Edit</button>

<button onclick="deleteTestimonial('${t._id}')">Delete</button>

`;

container.appendChild(div);

});

}

loadTestimonials();


// SAVE
document.getElementById("testimonialForm").addEventListener("submit",async function(e){

e.preventDefault();

const id=document.getElementById("testimonialId").value;

const formData=new FormData();

formData.append("name",document.getElementById("name").value);
formData.append("message",document.getElementById("message").value);
formData.append("rating",document.getElementById("rating").value);
formData.append("projectName",document.getElementById("projectName").value);
formData.append("location",document.getElementById("location").value);
formData.append("year",document.getElementById("year").value);

const image=document.getElementById("image").files[0];

if(image){
formData.append("image",image);
}

if(id){

await fetch("http://localhost:5000/api/testimonials/"+id,{
method:"PUT",
headers:{ Authorization:"Bearer "+token },
body:formData
});

alert("Updated Successfully");

}else{

await fetch("http://localhost:5000/api/testimonials",{
method:"POST",
headers:{ Authorization:"Bearer "+token },
body:formData
});

alert("Added Successfully");

}

document.getElementById("testimonialForm").reset();
document.getElementById("testimonialId").value="";

loadTestimonials();

});


// DELETE
async function deleteTestimonial(id){

if(confirm("Delete this testimonial?")){

await fetch("http://localhost:5000/api/testimonials/"+id,{
method:"DELETE",
headers:{ Authorization:"Bearer "+token }
});

alert("Deleted");

loadTestimonials();

}

}


// EDIT
function editTestimonial(id,name,message,rating,projectName,location,year){

document.getElementById("testimonialId").value=id;
document.getElementById("name").value=name;
document.getElementById("message").value=message;
document.getElementById("rating").value=rating;
document.getElementById("projectName").value=projectName || "";
document.getElementById("location").value=location || "";
document.getElementById("year").value=year || "";

}


// LOGOUT
function logout(){
localStorage.removeItem("adminToken");
window.location.href="admin.html";
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
