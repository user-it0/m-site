document.addEventListener("DOMContentLoaded", () => {
    const loginPage = document.getElementById("login-page");
    const chatPage = document.getElementById("chat-page");
    const loginButton = document.getElementById("login-btn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatBox = document.getElementById("chat-box");
    
    let messages = [
      { text: "こんにちは！", sender: "received" },
      { text: "やあ、元気？", sender: "sent" },
      { text: "はい、元気です！", sender: "received" }
    ];
  
    // ログイン処理
    loginButton.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (username && password) {
        loginPage.classList.remove("active");
        chatPage.classList.add("active");
      } else {
        alert("ユーザー名とパスワードを入力してください！");
      }
    });
  
    // チャットのメッセージを表示する関数
    const renderMessages = () => {
      chatBox.innerHTML = "";
      messages.forEach((message) => {
        const div = document.createElement("div");
        div.classList.add(message.sender);
        div.innerHTML = `<span>${message.text}</span>`;
        chatBox.appendChild(div);
      });
      chatBox.scrollTop = chatBox.scrollHeight;  // 新しいメッセージが下に表示されるように
    };
  
    // メッセージ送信処理
    sendButton.addEventListener("click", () => {
      const text = messageInput.value.trim();
      if (text !== "") {
        messages.push({ text, sender: "sent" });
        messageInput.value = "";
        renderMessages();
      }
    });
  
    // メッセージ入力後Enterキーで送信
    messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && messageInput.value.trim() !== "") {
        messages.push({ text: messageInput.value, sender: "sent" });
        messageInput.value = "";
        renderMessages();
      }
    });
  
    // 初期メッセージの表示
    renderMessages();
  });
  