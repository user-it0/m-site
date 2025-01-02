let users = [];  // ユーザー情報を格納
let currentUser = null;  // 現在ログイン中のユーザー
let talkRequests = [];  // トークリクエスト
let talkList = [];  // トーク可能なユーザーリスト
let questions = [];  // 質問リスト

// ログイン
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        alert(`${username}さん、ようこそ！`);
        goToEwisdom();
    } else {
        alert("ユーザー名またはパスワードが間違っています。");
    }
}

// 新規登録
function register() {
    const username = document.getElementById("new-username").value;

    if (username) {
        // 新規登録はパスワード不要で、ユーザー名のみ保存
        users.push({ username, password: "" }); // パスワードフィールドを空にして保存
        alert("登録が完了しました。ログインしてください。");
        goToLogin();
    } else {
        alert("ユーザー名を入力してください。");
    }
}

// ログイン画面へ遷移
function goToLogin() {
    document.getElementById("login-screen").classList.add("active");
    document.getElementById("register-screen").classList.remove("active");
}

// 新規登録画面へ遷移
function goToRegister() {
    document.getElementById("login-screen").classList.remove("active");
    document.getElementById("register-screen").classList.add("active");
}

// e-Wisdom画面に遷移
function goToEwisdom() {
    document.getElementById("login-screen").classList.remove("active");
    document.getElementById("e-wisdom-screen").classList.add("active");
}

// 質問・疑問を投稿する
function postQuestion() {
    const questionContent = prompt("質問・疑問を入力してください。");
    if (questionContent) {
        const question = {
            content: questionContent,
            poster: currentUser.username,
            id: Date.now()
        };
        questions.push(question);
        alert("質問が投稿されました！");
        renderQuestions();
    }
}

// 質問・疑問に答える
function answerQuestion() {
    renderQuestions();
}

// 質問リストの描画
function renderQuestions() {
    const questionsDiv = document.getElementById("questions");
    questionsDiv.innerHTML = "";
    questions.forEach(q => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "list-item";
        questionDiv.textContent = `${q.poster}: ${q.content}`;
        questionsDiv.appendChild(questionDiv);
    });
}

// トークリクエスト送信
function sendRequest() {
    const targetUser = document.getElementById("search-user").value.trim();

    if (!targetUser || targetUser === currentUser.username) {
        alert("有効なユーザー名を入力してください。");
        return;
    }

    const userExists = users.some(user => user.username === targetUser);
    if (!userExists) {
        alert("このユーザーは存在しません。");
        return;
    }

    talkRequests.push({ from: currentUser.username, to: targetUser });
    alert(`${targetUser} にトークリクエストを送信しました！`);
    renderRequestList();
}

// トークリクエストの描画
function renderRequestList() {
    const requestList = document.getElementById("request-list");
    requestList.innerHTML = "";

    talkRequests.forEach((request, index) => {
        if (request.to === currentUser.username) {
            const listItem = document.createElement("div");
            listItem.className = "list-item request";
            listItem.textContent = `リクエスト: ${request.from}`;
            listItem.onclick = () => acceptRequest(index);
            listItem.oncontextmenu = (e) => {
                e.preventDefault();
                rejectRequest(index);
            };
            requestList.appendChild(listItem);
        }
    });
}

// トークリクエストを受け入れる
function acceptRequest(index) {
    const request = talkRequests.splice(index, 1)[0];
    talkList.push(request.from);
    alert(`${request.from} とトーク可能になりました。`);
    renderTalkList();
}

// トークリクエストを拒否する
function rejectRequest(index) {
    talkRequests.splice(index, 1);
    alert("トークリクエストを拒否しました。");
    renderRequestList();
}

// トークリストの描画
function renderTalkList() {
    const talkListDiv = document.getElementById("talk-list");
    talkListDiv.innerHTML = "";

    talkList.forEach(user => {
        const listItem = document.createElement("div");
        listItem.className = "list-item talk";
        listItem.textContent = user;
        talkListDiv.appendChild(listItem);
    });
}