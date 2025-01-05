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
  const chatHistory = document.getElementById("chatHistory");

  let currentUser = "";
  let currentFriend = "";

  loginButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username && !localStorage.getItem(username)) {
      localStorage.setItem(username, JSON.stringify({ eLine: {}, eWisdom: [] }));
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
      localStorage.setItem(username, JSON.stringify({ eLine: {}, eWisdom: [] }));
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
      userData.eWisdom.push(newQuestion);
      localStorage.setItem(currentUser, JSON.stringify(userData));
      displayQuestions();
      questionInput.value = "";
    }
  });

  addFriendButton.addEventListener("click", () => {
    const friendName = friendInput.value.trim();
    if (friendName && friendName !== currentUser) {
      if (localStorage.getItem(friendName)) {
        currentFriend = friendName;
        updateFriendList();
        loadChatHistory();
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
    if (messageText && currentFriend) {
      const userData = JSON.parse(localStorage.getItem(currentUser));
      const friendData = JSON.parse(localStorage.getItem(currentFriend));

      // ユーザーと友達のチャット履歴を追加
      userData.eLine[currentFriend] = userData.eLine[currentFriend] || [];
      friendData.eLine[currentUser] = friendData.eLine[currentUser] || [];

      userData.eLine[currentFriend].push({ text: messageText, type: "sent" });
      friendData.eLine[currentUser].push({ text: messageText, type: "received" });

      localStorage.setItem(currentUser, JSON.stringify(userData));
      localStorage.setItem(currentFriend, JSON.stringify(friendData));

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
    userData.eWisdom.forEach((question, index) => {
      const questionItem = document.createElement("li");
      questionItem.textContent = question.question;
      questionList.appendChild(questionItem);
    });
  };

  const updateFriendList = () => {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    friendList.innerHTML = "";
    for (let friend in userData.eLine) {
      const friendItem = document.createElement("li");
      friendItem.textContent = friend;
      friendList.appendChild(friendItem);
    }
  };

  const loadChatHistory = () => {
    chatHistory.innerHTML = "";
    const userData = JSON.parse(localStorage.getItem(currentUser));
    const friendData = JSON.parse(localStorage.getItem(currentFriend));

    const userChat = userData.eLine[currentFriend] || [];
    const friendChat = friendData.eLine[currentUser] || [];

    const chatHistoryMessages = [...userChat, ...friendChat];

    chatHistoryMessages.forEach(msg => {
      addMessageToChat(msg.text, msg.type);
    });
  };

  const addMessageToChat = (message, type) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.className = type;
    chatHistory.appendChild(messageElement);
  };

  // 初期状態
  showLoginScreen();
});
