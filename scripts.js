let users = []; // ユーザーリスト（仮）

// ログインページからサインアップページへの遷移
document.getElementById('create-account-btn')?.addEventListener('click', () => {
    window.location.href = 'signup.html';
});

// サインアップページで登録ボタンの動作
document.getElementById('signup-btn')?.addEventListener('click', () => {
    const newUsername = document.getElementById('new-username').value;
    const password = document.getElementById('password').value;

    if (newUsername && password) {
        users.push({ username: newUsername, password });
        alert('アカウントが作成されました');
        window.location.href = 'program.html'; // プログラム画面に遷移
    } else {
        alert('ユーザー名とパスワードを入力してください');
    }
});

// ログインボタンの動作
document.getElementById('login-btn')?.addEventListener('click', () => {
    const usernameInput = document.getElementById('username-input').value;
    const user = users.find(u => u.username === usernameInput);

    if (user) {
        window.location.href = 'program.html'; // プログラム画面に遷移
    } else {
        alert('ユーザー名が見つかりません');
    }
});

// プログラム画面からe-wisdomページへの遷移
document.getElementById('e-wisdom-btn')?.addEventListener('click', () => {
    window.location.href = 'e_wisdom.html';
});

// e-wisdomページで疑問を投稿
document.getElementById('submit-question-btn')?.addEventListener('click', () => {
    const question = document.getElementById('question-input').value;
    alert('質問が投稿されました');
    document.getElementById('question-input').value = '';
});

// e-wisdomの質問一覧を表示
document.getElementById('view-questions-btn')?.addEventListener('click', () => {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = '<div>質問1</div><div>質問2</div>'; // 例として
});

// プログラム画面からe-lineページへの遷移
document.getElementById('e-line-btn')?.addEventListener('click', () => {
    window.location.href = 'e_line.html';
});

// e-lineページでユーザー検索
document.getElementById('search-user')?.addEventListener('input', () => {
    const searchValue = document.getElementById('search-user').value.toLowerCase();
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';

    users.forEach(user => {
        if (user.username.toLowerCase().includes(searchValue)) {
            const div = document.createElement('div');
            div.textContent = user.username;
            friendsList.appendChild(div);
        }
    });
});

// 戻るボタン
const backBtns = document.querySelectorAll('#back-btn');
backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        window.history.back();
    });
});
