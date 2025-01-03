document.addEventListener("DOMContentLoaded", () => {
    const newAccountButton = document.getElementById("newAccount");
    const loginButton = document.getElementById("login");
    const usernameField = document.getElementById("username");
  
    newAccountButton.addEventListener("click", () => {
      const username = usernameField.value.trim();
      if (username) {
        alert("Account created successfully! Redirecting to the program...");
        window.location.href = "program.html"; // Redirect to program page
      } else {
        alert("Please enter a valid username.");
      }
    });
  
    loginButton.addEventListener("click", () => {
      const username = usernameField.value.trim();
      if (username) {
        alert("Login successful! Redirecting to the program...");
        window.location.href = "program.html"; // Redirect to program page
      } else {
        alert("Please enter your username to login.");
      }
    });
  });  