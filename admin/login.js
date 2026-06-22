// Password Toggle
const toggleIcon = document.getElementById("toggleIcon");
const passwordInput = document.getElementById("password");

toggleIcon.addEventListener("click", () => {

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  } 
  else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  }

});


// Login Submit
document.getElementById("loginForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  try {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if(data.token){
      localStorage.setItem("adminToken", data.token);
      window.location.href = "admindashboard.html";
    } else {
      
    } errorMsg.textContent =
data.message || "Login Failed";

  } catch (error) {
    errorMsg.textContent = "Server Error. Please try again.";
  }
});