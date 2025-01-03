document.addEventListener("DOMContentLoaded", () => {
    const createAccountBtn = document.getElementById("createAccountBtn");
    const loginBtn = document.getElementById("loginBtn");
    const eWisdomBtn = document.getElementById("eWisdomBtn");
    const eLineBtn = document.getElementById("eLineBtn");
    const postQuestionBtn = document.getElementById("postQuestionBtn");
    const viewQuestionsBtn = document.getElementById("viewQuestionsBtn");
    const sendRequestBtn = document.getElementById("sendRequestBtn");
  
    const mainMenu = document.getElementById("mainMenu");
    const programScreen = document.getElementById("programScreen");
    const eWisdomScreen = document.getElementById("eWisdomScreen");
    const eLineScreen = document.getElementById("eLineScreen");
  
    // 画面を切り替える関数
    function showScreen(screenId) {
      // すべての画面を非表示に
      const screens = document.querySelectorAll(".screen");
      screens.forEach(screen => screen.style.display = "none");
  
      // 指定された画面のみ表示
      document.getElementById(screenId).style.display = "block";
    }
  
    // 新規アカウント作成ボタンの動作
    createAccountBtn.addEventListener("click", () => {
      mainMenu.style.display = "none";
      programScreen.style.display = "block";
    });
  
    // ログインボタンの動作
    loginBtn.addEventListener("click", () => {
      mainMenu.style.display = "none";
      programScreen.style.display = "block";
    });
  
    // e-wisdomボタンの動作
    eWisdomBtn.addEventListener("click", () => {
      showScreen("eWisdomScreen");
    });
  
    // e-lineボタンの動作
    eLineBtn.addEventListener("click", () => {
      showScreen("eLineScreen");
    });
  
    // 質問投稿ボタンの動作（仮の機能）
    postQuestionBtn.addEventListener("click", () => {
      alert("質問が投稿されました！");
    });
  
    // 質問一覧表示ボタンの動作（仮の機能）
    viewQuestionsBtn.addEventListener("click", () => {
      alert("質問一覧が表示されます！");
    });
  
    // ユーザー検索（e-lineのため）
    sendRequestBtn.addEventListener("click", () => {
      const userSearch = document.getElementById("userSearch").value;
      const userList = document.getElementById("userList");
      userList.innerHTML = `<li>${userSearch}</li>`;
    });
  });
  