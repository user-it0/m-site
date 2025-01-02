let userData = {};  // ユーザー情報
let friends = [];    // 友達リスト
let currentChat = null;  // 現在のトーク相手

// ユーザーがログイン
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // ここでは簡単なチェック（例: 空でないこと）を行います。実際のアプリケーションではサーバーとの認証が必要です。
  if (email && password) {
    userData = { email, password };  // 実際にはサーバーでチェックするべきです。
    console.log("ログイン情報:", userData);
    
    // 画面遷移
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("select-screen").style.display = "block";
  } else {
    alert("メールアドレスとパスワードを入力してください");
  }
}

// e-wisdom画面
function showWisdom() {
  document.getElementById("select-screen").style.display = "none";
  document.getElementById("e-wisdom-screen").style.display = "block";
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

// e-line画面
function showLine() {
  document.getElementById("select-screen").style.display = "none";
  document.getElementById("e-line-screen").style.display = "block";
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

// メッセージ送信
function sendMessage() {
  const message = document.getElementById("message-input").value;
  const messagesDiv = document.getElementById("messages");

  const messageDiv = document.createElement("div");
  messageDiv.textContent = `${userData.email}: ${message}`;
  messagesDiv.appendChild(messageDiv);

  document.getElementById("message-input").value = "";  // 入力欄をクリア
}

// ログアウトしてログイン画面に戻る
function goBackToLogin() {
  document.getElementById("select-screen").style.display = "none";
  document.getElementById("e-wisdom-screen").style.display = "none";
  document.getElementById("e-line-screen").style.display = "none";
  document.getElementById("login-screen").style.display = "block";
}

// 「戻る」ボタンで選択画面に戻る
function goBackToSelect() {
  document.getElementById("e-wisdom-screen").style.display = "none";
  document.getElementById("e-line-screen").style.display = "none";
  document.getElementById("select-screen").style.display = "block";
}