document.addEventListener("DOMContentLoaded", () => {
  const loginPage = document.getElementById("login-page");
  const chatPage = document.getElementById("chat-page");
  const loginButton = document.getElementById("login-btn");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const chatBox = document.getElementById("chat-box");
  const logoutButton = document.getElementById("logout-btn");

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
      div.classList.add("message", message.sender);
      div.innerHTML = `<span>${message.text}</span>`;
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;  // 新しいメッセージが下に表示されるように
  };

  // メッセージ送信処理
  sendButton.addEventListener("click", () => {
    const text = messageInput.value.trim();
    if (text !== "") {
      // 送信中のメッセージを表示
      const div = document.createElement("div");
      div.classList.add("message", "sent", "loading");
      div.innerHTML = `<span>送信中...</span>`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;

      // 1秒後にメッセージを確定
      setTimeout(() => {
        div.classList.remove("loading");
        div.innerHTML = `<span>${text}</span>`;
        messages.push({ text, sender: "sent" });
        messageInput.value = "";
        renderMessages();
      }, 1000);  // 送信後1秒遅れてメッセージ表示
    }
  });

  // メッセージ受信処理 (仮に自動でメッセージを受信する)
  setInterval(() => {
    const responses = [
      "こんにちは！調子はどうですか？",
      "何か質問がありますか？"
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    messages.push({ text: randomResponse, sender: "received" });
    renderMessages();
  }, 5000);  // 5秒ごとに受信メッセージを追加

  // ログアウト処理
  logoutButton.addEventListener("click", () => {
    chatPage.classList.remove("active");
    loginPage.classList.add("active");
  });

  // 初期表示
  renderMessages();
});
