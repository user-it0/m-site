document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const createAccountButton = document.getElementById("create-account");
    const loginButton = document.getElementById("login");
  
    // ログインページ
    if (window.location.pathname.includes("index.html")) {
      createAccountButton.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (username) {
          if (!localStorage.getItem(username)) {
            localStorage.setItem(username, JSON.stringify({ eWisdom: [], eLine: [] }));
            alert("アカウントが作成されました！");
            localStorage.setItem("currentUser", username);
            transitionToPage("program.html");
          } else {
            alert("このユーザー名はすでに存在します。");
          }
        } else {
          alert("ユーザー名を入力してください。");
        }
      });
  
      loginButton.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (localStorage.getItem(username)) {
          alert("ログイン成功！");
          localStorage.setItem("currentUser", username);
          transitionToPage("program.html");
        } else {
          alert("アカウントが見つかりません。");
        }
      });
    }
  
    // プログラムページ
    if (window.location.pathname.includes("program.html")) {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        alert("ログインしてください。");
        transitionToPage("index.html");
      } else {
        document.getElementById("current-user").textContent = currentUser;
  
        document.getElementById("e-wisdom").addEventListener("click", () => {
          transitionToPage("e-wisdom.html");
        });
  
        document.getElementById("e-line").addEventListener("click", () => {
          transitionToPage("e-line.html");
        });
  
        document.getElementById("logout").addEventListener("click", () => {
          localStorage.removeItem("currentUser");
          transitionToPage("index.html");
        });
      }
    }
  
    function transitionToPage(url) {
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = url;
      }, 500);
    }
  
    document.body.style.transition = "opacity 0.5s";
    document.body.style.opacity = "1";
  });  