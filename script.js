document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("login-section");
  const mainSection = document.getElementById("main-section");
  const eWisdomSection = document.getElementById("e-wisdom-section");
  const eLineSection = document.getElementById("e-line-section");
  const friendList = document.getElementById("friend-list");
  const chatSection = document.getElementById("chat-section");
  const chatBox = document.getElementById("chat-box");
  const questionInput = document.getElementById("question-input");
  const questionList = document.getElementById("question-list");
  const friendInput = document.getElementById("friend-input");
  const chatInput = document.getElementById("chat-input");

  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const postQuestionBtn = document.getElementById("post-question-btn");
  const addFriendBtn = document.getElementById("add-friend-btn");
  const sendMessageBtn = document.getElementById("send-message-btn");

  let currentUser = "";
  let activeChat = "";

  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
      const storedUser = JSON.parse(localStorage.getItem(username));
      if (storedUser && storedUser.password === password) {
        currentUser = username;
        document.getElementById("welcome-username").textContent = username;
        loginSection.style.display = "none";
        mainSection.style.display = "block";
        updateQuestionList();
        updateFriendList();
      } else {
        alert("ユーザー名またはパスワードが間違っています。");
      }
    } else {
      alert("ユーザー名とパスワードを入力してください。");
    }
  });

  registerBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
      const storedUser = JSON.parse(localStorage.getItem(username));
      if (!storedUser) {
        const newUser = {
          username,
          password,
          eWisdom: [],
          eLine: {}
        };
        localStorage.setItem(username, JSON.stringify(newUser));
        alert("新規登録が完了しました。ログインしてください。");
      } else {
        alert("そのユーザー名はすでに存在します。");
      }
    } else {
      alert("ユーザー名とパスワードを入力してください。");
    }
  });

  document.getElementById("e-wisdom-btn").addEventListener("click", () => {
    eWisdomSection.style.display = "block";
    eLineSection.style.display = "none";
  });

  document.getElementById("e-line-btn").addEventListener("click", () => {
    eLineSection.style.display = "block";
    eWisdomSection.style.display = "none";
  });

  postQuestionBtn.addEventListener("click", () => {
    const question = questionInput.value.trim();
    if (question) {
      const userData = JSON.parse(localStorage.getItem(currentUser));
      userData.eWisdom.push(question);
      localStorage.setItem(currentUser, JSON.stringify(userData));
      updateQuestionList();
      questionInput.value = "";
    }
  });

  addFriendBtn.addEventListener("click", () => {
    const friendName = friendInput.value.trim();
    if (friendName && localStorage.getItem(friendName)) {
      activeChat = friendName;
      chatSection.style.display = "block";
      friendList.style.display = "none";
      updateChatHistory();
    } else {
      alert("そのユーザーは存在しません。");
    }
  });

  sendMessageBtn.addEventListener("click", () => {
    const messageText = chatInput.value.trim();
    if (messageText) {
      const userData = JSON.parse(localStorage.getItem(currentUser));
      userData.eLine[activeChat] = userData.eLine[activeChat] || [];
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

  const updateQuestionList = () => {
    questionList.innerHTML = '';
    const userData = JSON.parse(localStorage.getItem(currentUser));
    userData.eWisdom.forEach((question) => {
      const questionDiv = document.createElement("div");
      questionDiv.textContent = question;
      questionList.appendChild(questionDiv);
    });
  };

  const updateFriendList = () => {
    friendList.innerHTML = '';
    const friends = Object.keys(localStorage);
    friends.forEach((friend) => {
      if (friend !== currentUser) {
        const friendItem = document.createElement("div");
        friendItem.classList.add("friend-item");
        friendItem.textContent = friend;
        friendItem.addEventListener("click", () => {
          activeChat = friend;
          chatSection.style.display = "block";
          friendList.style.display = "none";
          updateChatHistory();
        });
        friendList.appendChild(friendItem);
      }
    });
  };

  const updateChatHistory = () => {
    chatBox.innerHTML = '';
    const userData = JSON.parse(localStorage.getItem(currentUser));
    const chatHistory = userData.eLine[activeChat] || [];
    chatHistory.forEach((message) => {
      addMessageToChat(message.text, message.type);
    });
  };
});
