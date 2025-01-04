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
  
    const addFriendInput = document.getElementById("add-friend-input");
    const addFriendButton = document.getElementById("add-friend");
    const friendsList = document.getElementById("friends");
    const chatArea = document.getElementById("chat-area");
    const chatWith = document.getElementById("chat-with");
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendMessageButton = document.getElementById("send-message");
  
    const postQuestionButton = document.getElementById("post-question");
    const questionInput = document.getElementById("question-input");
    const questionList = document.getElementById("question-list");
  
    let currentUser = null;
    let friends = [];
    let chatHistory = {};
  
    const showPage = (pageKey) => {
      Object.values(pages).forEach((p) => p.classList.remove("active"));
      pages[pageKey].classList.add("active");
    };
  
    showPage("login");
  
    createAccountButton.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      if (username) {
        localStorage.setItem(username, JSON.stringify({ friends: [], chatHistory: {} }));
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
        const userData = JSON.parse(localStorage.getItem(username));
        friends = userData.friends;
        chatHistory = userData.chatHistory;
        updateFriendsList();
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
  
    addFriendButton.addEventListener("click", () => {
      const friendName = addFriendInput.value.trim();
      if (friendName && !friends.includes(friendName)) {
        friends.push(friendName);
        chatHistory[friendName] = [];
        updateFriendsList();
        addFriendInput.value = "";
        saveUserData();
      } else {
        alert("有効な友達の名前を入力してください。");
      }
    });
  
    const updateFriendsList = () => {
      friendsList.innerHTML = "";
      friends.forEach((friend) => {
        const listItem = document.createElement("li");
        listItem.textContent = friend;
        listItem.addEventListener("click", () => openChat(friend));
        friendsList.appendChild(listItem);
      });
    };
  
    const openChat = (friend) => {
      chatWith.textContent = friend;
      chatArea.classList.remove("hidden");
      chatBox.innerHTML = "";
      chatHistory[friend].forEach((message) => {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
      });
    };
  
    sendMessageButton.addEventListener("click", () => {
      const message = chatInput.value.trim();
      if (message) {
        const friend = chatWith.textContent;
        chatHistory[friend].push(`あなた: ${message}`);
        chatBox.innerHTML += `<div>あなた: ${message}</div>`;
        chatInput.value = "";
        saveUserData();
      }
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
  
    const saveUserData = () => {
      const userData = { friends, chatHistory };
      localStorage.setItem(currentUser, JSON.stringify(userData));
    };
  });
  