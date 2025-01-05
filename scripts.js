document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("loginScreen");
  const programScreen = document.getElementById("programScreen");
  const eWisdomScreen = document.getElementById("eWisdomScreen");
  const eLineScreen = document.getElementById("eLineScreen");

  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");
  const eWisdomButton = document.getElementById("eWisdomButton");
  const eLineButton = document.getElementById("eLineButton");
  const backToProgramButton = document.getElementById("backToProgramButton");
  const backToProgramFromLineButton = document.getElementById("backToProgramFromLineButton");

  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const welcomeUser = document.getElementById("welcomeUser");

  const questionInput = document.getElementById("questionInput");
  const postQuestionButton = document.getElementById("postQuestionButton");
  const questionList = document.getElementById("questionList");

  const friendInput = document.getElementById("friendInput");
  const addFriendButton = document.getElementById("addFriendButton");
  const friendList = document.getElementById("friendList");
  const chatBox = document.getElementById("chatBox");
  const chatInput = document.getElementById("chatInput");
  const sendMessageButton = document.getElementById("sendMessageButton");

  let currentUser = null;
  let activeChat = null;

  // ログイン処理
  loginButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
      const userData = localStorage.getItem(username);
      if (userData && JSON.parse(userData).password === password) {
        currentUser = username;
        localStorage.setItem("currentUser", username);
        switchScreen(programScreen);
        welcomeUser.textContent = username;
      } else {
        alert("ユーザー名またはパスワードが違います。");
      }
    } else {
      alert("ユーザー名とパスワードを入力してください。");
    }
  });

  // 新規登録処理
  registerButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
      const userData = {
        username: username,
        password: password,
        eLine: {},
      };
      localStorage.setItem(username, JSON.stringify(userData));
      alert("新規登録が完了しました。ログインしてください。");
    } else {
      alert("ユーザー名とパスワードを入力してください。");
    }
  });

  // ログアウト処理
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    currentUser = null;
    switchScreen(loginScreen);
  });

  // e-Wisdomボタン
  eWisdomButton.addEventListener("click", () => {
    switchScreen(eWisdomScreen);
  });

  // e-Lineボタン
  eLineButton.addEventListener("click", () => {
    switchScreen(eLineScreen);
    loadFriends();
  });

  // 質問投稿ボタン
  postQuestionButton.addEventListener("click", () => {
    const question = questionInput.value.trim();
    if (question) {
      const userData = JSON.parse(localStorage.getItem(currentUser));
      userData.questions = userData.questions || [];
      userData.questions.push({ question: question, answers: [] });
      localStorage.setItem(currentUser, JSON.stringify(userData));
      loadQuestions();
      questionInput.value = "";
    }
  });

  // 戻るボタン (e-Wisdom)
  backToProgramButton.addEventListener("click", () => {
    switchScreen(programScreen);
  });

  // 戻るボタン (e-Line)
  backToProgramFromLineButton.addEventListener("click", () => {
    switchScreen(programScreen);
  });

  // 友達追加ボタン
  addFriendButton.addEventListener("click", () => {
    const friendName = friendInput.value.trim();
    if (friendName && friendName !== currentUser) {
      // ローカルストレージで友達の存在を確認
      if (localStorage.getItem(friendName)) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.eLine[friendName] = userData.eLine[friendName] || [];
        localStorage.setItem(currentUser, JSON.stringify(userData));
        loadFriends();
        friendInput.value = "";
      } else {
        alert("そのユーザーは存在しません。");
      }
    } else {
      alert("友達の名前を正しく入力してください。");
    }
  });

  // メッセージ送信ボタン
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

  const switchScreen = (screen) => {
    document.querySelectorAll(".screen").forEach((s) => {
      s.style.display = "none";
    });
    screen.style.display = "block";
  };

  const loadQuestions = () => {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    questionList.innerHTML = "";
    (userData.questions || []).forEach((q, index) => {
      const questionElement = document.createElement("div");
      questionElement.textContent = q.question;
      questionList.appendChild(questionElement);
    });
  };

  const loadFriends = () => {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    friendList.innerHTML = "";
    Object.keys(userData.eLine).forEach((friend) => {
      const friendElement = document.createElement("div");
      friendElement.textContent = friend;
      friendElement.addEventListener("click", () => {
        activeChat = friend;
        loadChat();
      });
      friendList.appendChild(friendElement);
    });
  };

  const loadChat = () => {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    chatBox.innerHTML = "";
    userData.eLine[activeChat].forEach((msg) => {
      const messageElement = document.createElement("div");
      messageElement.classList.add(msg.type);
      messageElement.textContent = msg.text;
      chatBox.appendChild(messageElement);
    });
  };

  const addMessageToChat = (message, type) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add(type);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
  };

  switchScreen(loginScreen);
});
