document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("loginScreen");
  const programScreen = document.getElementById("programScreen");
  const eWisdomScreen = document.getElementById("eWisdomScreen");
  const eLineScreen = document.getElementById("eLineScreen");
  const questionInput = document.getElementById("questionInput");
  const postQuestionButton = document.getElementById("postQuestionButton");
  const questionList = document.getElementById("questionList");
  const usernameInput = document.getElementById("usernameInput");
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");
  const eWisdomButton = document.getElementById("eWisdomButton");
  const eLineButton = document.getElementById("eLineButton");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const friendInput = document.getElementById("friendInput");
  const addFriendButton = document.getElementById("addFriendButton");
  const friendList = document.getElementById("friendList");
  const chatBox = document.getElementById("chatBox");
  const chatInput = document.getElementById("chatInput");
  const sendMessageButton = document.getElementById("sendMessageButton");

  let currentUser = "";

  loginButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username && !localStorage.getItem(username)) {
      localStorage.setItem(username, JSON.stringify({ eLine: {} }));
      currentUser = username;
      localStorage.setItem("currentUser", currentUser);
      showProgramScreen();
    } else if (localStorage.getItem(username)) {
      currentUser = username;
      localStorage.setItem("currentUser", currentUser);
      showProgramScreen();
    } else {
      alert("ユーザー名が存在しません。");
    }
  });

  registerButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username && !localStorage.getItem(username)) {
      localStorage.setItem(username, JSON.stringify({ eLine: {} }));
      currentUser = username;
      localStorage.setItem("currentUser", currentUser);
      showProgramScreen();
    } else {
      alert("そのユーザー名はすでに使われています。");
    }
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    currentUser = "";
    showLoginScreen();
  });

  eWisdomButton.addEventListener("click", () => {
    showEWisdomScreen();
  });

  eLineButton.addEventListener("click", () => {
    showElineScreen();
  });

  postQuestionButton.addEventListener("click", () => {
    const question = questionInput.value.trim();
    if (question) {
      const userData = JSON.parse(localStorage.getItem(currentUser));
      const newQuestion = { question, answers: [] };
      userData.eLine.questions = userData.eLine.questions || [];
      userData.eLine.questions.push(newQuestion);
      localStorage.setItem(currentUser, JSON.stringify(userData));
      displayQuestions();
      questionInput.value = "";
    }
  });

  addFriendButton.addEventListener("click", () => {
    const friendName = friendInput.value.trim();
    if (friendName && friendName !== currentUser) {
      if (localStorage.getItem(friendName)) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.eLine[friendName] = userData.eLine[friendName] || [];
        localStorage.setItem(currentUser, JSON.stringify(userData));
        updateFriendList();
        friendInput.value = "";
      } else {
        alert("そのユーザーは存在しません。");
      }
    } else {
      alert("友達の名前を正しく入力してください。");
    }
  });

  sendMessageButton.addEventListener("click", () => {
    const messageText = chatInput.value.trim();
    if (messageText) {
      const userData = JSON.parse(localStorage.getItem(currentUser));
      userData.eLine[friendName].push({ text: messageText, type: "sent" });
      localStorage.setItem(currentUser, JSON.stringify(userData));
      addMessageToChat(messageText, "sent");
      chatInput.value = "";
    }
  });

  const showLoginScreen = () => {
    loginScreen.style.display = "block";
    programScreen.style.display = "none";
    eWisdomScreen.style.display = "none";
    eLineScreen.style.display = "none";
  };

  const showProgramScreen = () => {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    usernameDisplay.textContent = currentUser;
    loginScreen.style.display = "none";
    programScreen.style.display = "block";
    eWisdomScreen.style.display = "none";
    eLineScreen.style.display = "none";
  };

  const showEWisdomScreen = () => {
    loginScreen.style.display = "none";
    programScreen.style.display = "none";
    eWisdomScreen.style.display = "block";
    eLineScreen.style.display = "none";
    displayQuestions();
  };

  const showElineScreen = () => {
    loginScreen.style.display = "none";
    programScreen.style.display = "none";
    eWisdomScreen.style.display = "none";
    eLineScreen.style.display = "block";
    updateFriendList();
  };

  const displayQuestions = () => {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    questionList.innerHTML = "";
    if (userData.eLine.questions) {
      userData.eLine.questions.forEach((q) => {
        const questionItem = document.createElement("li");
        questionItem.textContent = q.question;
        questionList.appendChild(questionItem);
      });
    }
  };

  const updateFriendList = () => {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    friendList.innerHTML = "";
    for (let friend in userData.eLine) {
      if (friend !== "questions") {
        const friendItem = document.createElement("li");
        friendItem.textContent = friend;
        friendList.appendChild(friendItem);
      }
    }
  };

  const addMessageToChat = (message, type) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.className = type;
    chatBox.appendChild(messageElement);
  };

  // 初期状態
  showLoginScreen();
});
