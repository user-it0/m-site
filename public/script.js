document.addEventListener("DOMContentLoaded", () => {
    const socket = new WebSocket('ws://localhost:3000');
    
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
  
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.from && data.text) {
        addMessageToChat(data.text, "received");
      }
    };
  
    createAccountButton.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      if (username) {
        localStorage.setItem(username, JSON.stringify({ eWisdom: [], eLine: {} }));
        alert("アカウントが作成されました！");
        currentUser = username;
        document.getElementById("current-user").textContent = currentUser;
        socket.send(JSON.stringify({ type: 'join', from: currentUser }));
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
        socket.send(JSON.stringify({ type: 'join', from: currentUser }));
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
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.eWisdom.push(question);
        localStorage.setItem(currentUser, JSON.stringify(userData));
        updateQuestionList();
        questionInput.value = "";
      }
    });
  
    addFriendButton.addEventListener("click", () => {
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
  
    sendMessageButton.addEventListener("click", () => {
      const messageText = chatInput.value.trim();
      if (messageText) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.eLine[activeChat] = userData.eLine[activeChat] || [];
        userData.eLine[activeChat].push({ text: messageText, type: "sent" });
        localStorage.setItem(currentUser, JSON.stringify(userData));
        socket.send(JSON.stringify({ type: "message", from: currentUser, to: activeChat, text: messageText }));
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
  