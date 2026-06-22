const api="http://localhost:5000/api/parties"

const form=document.getElementById("partyForm")
const partyList=document.getElementById("partyList")

let editId=null


/* GET PARTIES */

async function loadParties(){

const res=await fetch(api)
const data=await res.json()

partyList.innerHTML=""

data.forEach(p=>{

partyList.innerHTML+=`

<div class="party-card">

<img src="http://localhost:5000${p.logo}" width="80">

<h4>${p.name}</h4>

<button onclick="editParty('${p._id}','${p.name}','${p.logo}')">Edit</button>

<button onclick="deleteParty('${p._id}')">Delete</button>

</div>

`

})

}

loadParties()



/* ADD PARTY */

form.addEventListener("submit",async(e)=>{

e.preventDefault()

const name=document.getElementById("name").value
const logo=document.getElementById("logo").files[0]

const formData=new FormData()
formData.append("name",name)
formData.append("logo",logo)


if(editId){

await fetch(api+"/"+editId,{
method:"PUT",
body:formData
})

}else{

await fetch(api,{
method:"POST",
body:formData
})

}

form.reset()
editId=null

loadParties()

})



/* DELETE */

async function deleteParty(id){

await fetch(api+"/"+id,{
method:"DELETE"
})

loadParties()

}



/* EDIT */

function editParty(id,name,logo){

editId=id

document.getElementById("name").value=name

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
