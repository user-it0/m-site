document.addEventListener("DOMContentLoaded", () => {
    const pages = {
      login: document.getElementById("login-page"),
      program: document.getElementById("program-page"),
      eWisdom: document.getElementById("e-wisdom-page"),
      eLine: document.getElementById("e-line-page"),
    };
  
    const usernameInput = document.getElementById("username");
    const createAccountButton = document.getElementById("create-account");
    const loginButton = document.getElementById("login");
    const logoutButton = document.getElementById("logout");
    const eWisdomButton = document.getElementById("e-wisdom");
    const eLineButton = document.getElementById("e-line");
    const backToProgramWisdom = document.getElementById("back-to-program-wisdom");
    const backToProgramLine = document.getElementById("back-to-program-line");
  
    const postQuestionButton = document.getElementById("post-question");
    const questionInput = document.getElementById("question-input");
    const questionList = document.getElementById("question-list");
  
    let currentUser = null;
  
    const showPage = (pageKey) => {
      Object.values(pages).forEach((p) => p.classList.remove("active"));
      pages[pageKey].classList.add("active");
    };
  
    showPage("login");
  
    createAccountButton.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      if (username) {
        localStorage.setItem(username, JSON.stringify({ eWisdom: [] }));
        alert("アカウントが作成されました！");
        currentUser = username;
        document.getElementById("current-user").textContent = currentUser;
        showPage("program");
      } else {
        alert("ユーザー名を入力してください。");
      }
    });
  
    loginButton.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      if (localStorage.getItem(username)) {
        currentUser = username;
        document.getElementById("current-user").textContent = currentUser;
        showPage("program");
      } else {
        alert("アカウントが存在しません。");
      }
    });
  
    logoutButton.addEventListener("click", () => {
      currentUser = null;
      showPage("login");
    });
  
    eWisdomButton.addEventListener("click", () => {
      showPage("eWisdom");
    });
  
    eLineButton.addEventListener("click", () => {
      showPage("eLine");
    });
  
    backToProgramWisdom.addEventListener("click", () => {
      showPage("program");
    });
  
    backToProgramLine.addEventListener("click", () => {
      showPage("program");
    });
  
    postQuestionButton.addEventListener("click", () => {
      const question = questionInput.value.trim();
      if (question) {
        const questionItem = document.createElement("div");
        questionItem.textContent = question;
        questionList.appendChild(questionItem);
        questionInput.value = "";
      } else {
        alert("質問を入力してください。");
      }
    });
  });  