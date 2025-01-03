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
          alert("アカウントが作成されました！");
          localStorage.setItem("currentUser", username);
          window.location.href = "program.html";
        } else {
          alert("ユーザー名を入力してください。");
        }
      });
  
      loginButton.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (localStorage.getItem(username)) {
          alert("ログイン成功！");
          localStorage.setItem("currentUser", username);
          window.location.href = "program.html";
        } else {
          alert("アカウントが存在しません。先にアカウントを作成してください。");
        }
      });
    }
  
    // プログラムページ
    if (window.location.pathname.includes("program.html")) {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        alert("ログインしてください。");
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
  
    // e-Line機能
    if (window.location.pathname.includes("e-line.html")) {
      const sendRequestButton = document.getElementById("send-request");
      const searchUserInput = document.getElementById("search-user");
      const friendList = document.getElementById("friend-list");
      const chatBox = document.getElementById("chat-box");
  
      sendRequestButton.addEventListener("click", () => {
        const username = searchUserInput.value.trim();
        if (username) {
          let friendListItem = document.createElement("li");
          friendListItem.textContent = username;
          friendList.appendChild(friendListItem);
          searchUserInput.value = "";
        } else {
          alert("ユーザー名を入力してください。");
        }
      });
    }
  });  