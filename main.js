let userData = {};  // ユーザー情報
let friends = [];    // 友達リスト
let usersList = [];  // ユーザー情報を保存するリスト
let games = [
  { name: "Draw a Perfect Circle", description: "完璧な円を描こう！" },
  { name: "オンラインオセロ", description: "ユーザー同士のオセロ対戦。" }
];  // ゲームリスト

// ユーザー情報をダミーデータとして作成（通常はサーバーで保存・取得する）
function initializeUsers() {
  usersList.push({ email: "user1@example.com", password: "password1" });
  usersList.push({ email: "user2@example.com", password: "password2" });
}

// ログイン時にパスワード確認
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = usersList.find(user => user.email === email && user.password === password);

  if (user) {
    userData = user;  // ユーザー情報を保存
    console.log("ログイン成功:", userData);

    // ログイン後の画面遷移
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("select-screen").style.display = "block";
    document.getElementById("login-error").style.display = "none";
  } else {
    // ログイン失敗
    document.getElementById("login-error").style.display = "block";
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

  document.getElementById("question-input").value = "";
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
  
  document.getElementById("friend-input").value = "";
}

// メッセージ送信
function sendMessage() {
  const message = document.getElementById("message-input").value;
  const messagesDiv = document.getElementById("messages");

  const messageDiv = document.createElement("div");
  messageDiv.textContent = `${userData.email}: ${message}`;
  messagesDiv.appendChild(messageDiv);

  document.getElementById("message-input").value = "";
}

// e-game画面
function showGame() {
  document.getElementById("select-screen").style.display = "none";
  document.getElementById("e-game-screen").style.display = "block";
  
  // ゲーム一覧を表示
  displayGames();
}

// ゲーム一覧を表示
function displayGames() {
  const gameListDiv = document.getElementById("game-list");
  gameListDiv.innerHTML = "";  // 既存のゲームリストをクリア

  games.forEach(game => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game-item");

    const gameName = document.createElement("h3");
    gameName.textContent = game.name;
    const gameDescription = document.createElement("p");
    gameDescription.textContent = game.description;
    
    gameDiv.appendChild(gameName);
    gameDiv.appendChild(gameDescription);

    const playButton = document.createElement("button");
    playButton.textContent = "プレイ";
    playButton.onclick = () => alert(`ゲーム「${game.name}」をプレイします！`);

    gameDiv.appendChild(playButton);
    gameListDiv.appendChild(gameDiv);
  });
}

// ゲーム追加
function addGame() {
  const gameName = prompt("ゲーム名を入力してください");
  const gameDescription = prompt("ゲームの説明を入力してください");
  
  if (gameName && gameDescription) {
    games.push({ name: gameName, description: gameDescription });
    displayGames();  // ゲームリストを再表示
  }
}

// ログアウト
function goBackToLogin() {
  document.getElementById("select-screen").style.display = "none";
  document.getElementById("login-screen").style.display = "block";
  userData = {};  // ユーザー情報をクリア
}

// 選択画面に戻る
function goBackToSelect() {
  document.getElementById("e-wisdom-screen").style.display = "none";
  document.getElementById("e-line-screen").style.display = "none";
  document.getElementById("e-game-screen").style.display = "none";
  document.getElementById("select-screen").style.display = "block";
}

// 初期化処理
initializeUsers();