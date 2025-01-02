let currentUser = null;

// ログイン画面に戻る
function backToLogin() {
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('signup-screen').style.display = 'none';
}

// サインアップ画面を表示
function showSignUp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('signup-screen').style.display = 'block';
}

// 新規アカウント作成
function createAccount() {
    let username = document.getElementById('new-username').value;
    let password = document.getElementById('password').value;
    if (username && password) {
        alert('アカウント作成完了');
        backToLogin();
    }
}

// ログイン処理
function login() {
    let username = document.getElementById('username').value;
    if (username) {
        currentUser = username;
        document.getElementById('user-name').textContent = username;
        showProgramScreen();
    }
}

// プログラム画面の表示
function showProgramScreen() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('program-screen').style.display = 'block';
}

// e-wisdom画面の表示
function showWisdom() {
    document.getElementById('program-screen').style.display = 'none';
    document.getElementById('wisdom-screen').style.display = 'block';
}

// e-line画面の表示
function showLine() {
    document.getElementById('program-screen').style.display = 'none';
    document.getElementById('line-screen').style.display = 'block';
}

// 質問を投稿
function postQuestion() {
    let question = document.getElementById('question-input').value;
    if (question) {
        alert('質問が投稿されました');
        backToProgram();
    }
}

// 友達リクエストを送信
function sendRequest() {
    let friend = document.getElementById('friend-username').value;
    if (friend) {
        alert(`${friend}にリクエストを送信しました`);
        backToProgram();
    }
}

// 戻るボタン
function backToProgram() {
    document.getElementById('wisdom-screen').style.display = 'none';
    document.getElementById('line-screen').style.display = 'none';
    document.getElementById('program-screen').style.display = 'block';
}