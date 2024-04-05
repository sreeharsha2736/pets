
var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

// Display the user's first name in navigation if logged in
if (currentUser) {
  var userFirstName = document.getElementById("userFirstName");
  userFirstName.textContent = currentUser.name.split(' ')[0];
  userFirstName.style.display = "inline"; // Show the user's first name
  document.getElementById("loginBtnContainer").style.display = "none"; // Hide signin button
  document.getElementById("logoutBtnContainer").style.display = "inline"; // Show logout button
} else {
  document.getElementById("loginBtnContainer").style.display = "inline"; // Show signin button
  document.getElementById("logoutBtnContainer").style.display = "none"; // Hide logout button
}

// Logout function
function handleLogoutButton() {
  sessionStorage.removeItem("currentUser"); // Remove user's session
  location.reload(); // Reload the page to reflect changes
}
