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

  const friendInput = document.getElementById("friend-input");
  const addFriendButton = document.getElementById("add-friend");
  const friendList = document.getElementById("friend-list");
  const chatSection = document.getElementById("chat-section");
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const sendMessageButton = document.getElementById("send-message");

  let currentUser = null;
  let activeChat = null;

  const showPage = (pageKey) => {
    Object.values(pages).forEach((p) => p.classList.remove("active"));
    pages[pageKey].classList.add("active");
  };

  showPage("login");

  createAccountButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem(username, JSON.stringify({ eWisdom: [], eLine: {} }));
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
    updateFriendList();
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

  addFriendButton.addEventListener("click", () => {
    const friendName = friendInput.value.trim();
    if (friendName && friendName !== currentUser) {
      const userData = JSON.parse(localStorage.getItem(currentUser));
      userData.eLine[friendName] = userData.eLine[friendName] || [];
      localStorage.setItem(currentUser, JSON.stringify(userData));
      updateFriendList();
      friendInput.value = "";
    } else {
      alert("友達の名前を正しく入力してください。");
    }
  });

  const updateFriendList = () => {
    friendList.innerHTML = "";
    const userData = JSON.parse(localStorage.getItem(currentUser));
    Object.keys(userData.eLine).forEach((friend) => {
      const friendItem = document.createElement("div");
      friendItem.textContent = friend;
      friendItem.classList.add("friend-item");
      friendItem.addEventListener("click", () => {
        activeChat = friend;
        chatSection.style.display = "block";
        chatBox.innerHTML = "";
        userData.eLine[activeChat].forEach((msg) => {
          addMessageToChat(msg.text, msg.type);
        });
      });
      friendList.appendChild(friendItem);
    });
  };

  sendMessageButton.addEventListener("click", () => {
    const messageText = chatInput.value.trim();
    if (messageText) {
      const userData = JSON.parse(localStorage.getItem(currentUser));
      userData.eLine[activeChat].push({ text: messageText, type: "sent" });
      localStorage.setItem(currentUser, JSON.stringify(userData));
      addMessageToChat(messageText, "sent");
      chatInput.value = "";
    }
  });

  const addMessageToChat = (message, type) => {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.classList.add(type);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  };
});
