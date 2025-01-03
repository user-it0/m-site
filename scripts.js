document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const createAccountButton = document.getElementById("create-account");
    const loginButton = document.getElementById("login");
    const logoutButton = document.getElementById("logout");
  
    // ログインページ
    if (window.location.pathname.includes("index.html")) {
      createAccountButton.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (username) {
          localStorage.setItem(username, JSON.stringify({ eWisdom: [], eLine: [] }));
          alert("Account created successfully!");
          localStorage.setItem("currentUser", username);
          window.location.href = "program.html";
        } else {
          alert("Please enter a username.");
        }
      });
  
      loginButton.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (localStorage.getItem(username)) {
          alert("Login successful!");
          localStorage.setItem("currentUser", username);
          window.location.href = "program.html";
        } else {
          alert("Account does not exist. Please create an account first.");
        }
      });
    }
  
    // プログラムページ
    if (window.location.pathname.includes("program.html")) {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        alert("Please log in first.");
        window.location.href = "index.html";
      } else {
        document.getElementById("current-user").textContent = currentUser;
  
        document.getElementById("e-wisdom").addEventListener("click", () => {
          window.location.href = "e-wisdom.html";
        });
  
        document.getElementById("e-line").addEventListener("click", () => {
          window.location.href = "e-line.html";
        });
  
        logoutButton.addEventListener("click", () => {
          localStorage.removeItem("currentUser");
          window.location.href = "index.html";
        });
      }
    }
  
    // その他のページ機能実装を追加 (例: e-wisdom, e-line) ...
  });  