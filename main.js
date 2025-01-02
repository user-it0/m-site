let userData = {};  // ユーザー情報
let isFirstLogin = true;  // 初回ログインフラグ

// 初回ログイン（アカウント作成）
function createAccount() {
    const email = document.getElementById("email").value;
    const emailPassword = document.getElementById("email-password").value;
    const username = document.getElementById("username").value;
    const sitePassword = document.getElementById("site-password").value;

    // メールアドレスとパスワードが正しいか確認（ダミーデータ）
    if (email !== "test@example.com" || emailPassword !== "testpassword") {
        document.getElementById("first-login-error").style.display = "block";
        return;
    }

    // アカウント情報を保存
    userData = {
        email: email,
        emailPassword: emailPassword,
        username: username,
        sitePassword: sitePassword
    };

    // アカウント作成成功後、ログイン画面に遷移
    document.getElementById("first-login-screen").style.display = "none";
    document.getElementById("login-screen").style.display = "block";
    document.getElementById("first-login-error").style.display = "none";
    isFirstLogin = false;
}

// ログイン
function loginUser() {
    const username = document.getElementById("login-username").value;
    const sitePassword = document.getElementById("login-site-password").value;

    // サイト内パスワードとユーザー名の確認
    if (userData.username !== username || userData.sitePassword !== sitePassword) {
        document.getElementById("login-error").style.display = "block";
        return;
    }

    // ログイン成功後、選択画面に遷移
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("select-screen").style.display = "block";
    document.getElementById("login-error").style.display = "none";
}

// 画面遷移
function goToWisdom() {
    document.getElementById("select-screen").style.display = "none";
    document.getElementById("wisdom-screen").style.display = "block";
}

function goToLine() {
    document.getElementById("select-screen").style.display = "none";
    document.getElementById("line-screen").style.display = "block";
}

function goToGame() {
    alert("e-gameに遷移");
}

function goBackToSelect() {
    document.getElementById("wisdom-screen").style.display = "none";
    document.getElementById("line-screen").style.display = "none";
    document.getElementById("select-screen").style.display = "block";
}

// e-wisdom の質問投稿
function submitWisdomQuestion() {
    const question = document.getElementById("wisdom-question").value;
    if (question) {
        const answerDiv = document.getElementById("wisdom-answers");
        const answer = document.createElement("div");
        answer.textContent = `Q: ${question} - A: これはベストアンサーです。`;
        answerDiv.appendChild(answer);
    }
}

// e-line のメッセージ送信
function sendMessage() {
    const messageInput = document.getElementById("line-input").value;
    if (messageInput) {
        const messageBox = document.getElementById("message-box");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.textContent = messageInput;
        messageBox.appendChild(messageDiv);
        document.getElementById("line-input").value = "";
        messageBox.scrollTop = messageBox.scrollHeight; // メッセージが表示されたらスクロール
    }
}