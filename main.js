let userData = {};  // ユーザー情報
let friends = [];    // 友達リスト
let currentChat = null;  // 現在のトーク相手

// ユーザー登録
function registerUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  userData = { email, password, username };
  console.log("ユーザー登録情報:", userData);
  
  // 画面遷移
  document.getElementById("register-screen").style.display = "none";
  document.getElementById("program-screen").style.display = "block";
}

// e-wisdom機能
function showWisdom() {
  document.getElementById("e-wisdom-screen").style.display = "block";
  document.getElementById("e-line-screen").style.display = "none";
}

// 質問投稿
function postQuestion() {
  const question = document.getElementById("question-input").value;
  const questionList = document.getElementById("question-list");
  
  const listItem = document.createElement("li");
  listItem.textContent = question;
  questionList.appendChild(listItem);

  document.getElementById("question-input").value = "";  // 入力欄をクリア
}

// e-line機能
function showLine() {
  document.getElementById("e-line-screen").style.display = "block";
  document.getElementById("e-wisdom-screen").style.display = "none";
}

// 友達リクエスト送信
function sendRequest() {
  const friendName = document.getElementById("friend-input").value;
  const friendsList = document.getElementById("friends-list");
  
  if (!friends.includes(friendName)) {
    friends.push(friendName);  // 友達リストに追加
    const listItem = document.createElement("li");
    listItem.textContent = friendName;
    friendsList.appendChild(listItem);
  }
  
  document.getElementById("friend-input").value = "";  // 入力欄をクリア
}

// 友達とトーク開始
function startChat(friendName) {
  currentChat = friendName;
  document.getElementById("chat-box").style.display = "block";
  document.getElementById("messages").innerHTML = "";  // チャットの内容をリセット
}

// メッセージ送信
function sendMessage() {
  const message = document.getElementById("message-input").value;
  const messagesDiv = document.getElementById("messages");

  const messageDiv = document.createElement("div");
  messageDiv.textContent = `${userData.username}: ${message}`;
  messagesDiv.appendChild(messageDiv);

  document.getElementById("message-input").value = "";  // 入力欄をクリア
}