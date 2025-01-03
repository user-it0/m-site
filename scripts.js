document.addEventListener('DOMContentLoaded', () => {
    // ログイン・サインアップ画面の切り替え
    const loginScreen = document.getElementById('login-screen');
    const signupScreen = document.getElementById('signup-screen');
    const programScreen = document.getElementById('program-screen');
    const eWisdomScreen = document.getElementById('e-wisdom-screen');
    const eLineScreen = document.getElementById('e-line-screen');
    const chatScreen = document.getElementById('chat-screen');
    
    const createAccountBtn = document.getElementById('create-account-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');
    const postQuestionBtn = document.getElementById('post-question-btn');
    const answerQuestionBtn = document.getElementById('answer-question-btn');
    const eWisdomBtn = document.getElementById('e-wisdom-btn');
    const eLineBtn = document.getElementById('e-line-btn');
    const submitQuestionBtn = document.getElementById('submit-question-btn');
    const viewQuestionsBtn = document.getElementById('view-questions-btn');
    const searchUser = document.getElementById('search-user');
    const friendsList = document.getElementById('friends-list');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message-btn');

    let users = []; // ユーザーリスト（仮）

    // 新規作成ボタン
    createAccountBtn.addEventListener('click', () => {
        loginScreen.classList.add('hidden');
        signupScreen.classList.remove('hidden');
    });

    // サインアップ
    signupBtn.addEventListener('click', () => {
        const newUsername = document.getElementById('new-username').value;
        const password = document.getElementById('password').value;
        users.push({ username: newUsername, password });
        alert('アカウントが作成されました');
        signupScreen.classList.add('hidden');
        programScreen.classList.remove('hidden');
    });

    // ログイン
    loginBtn.addEventListener('click', () => {
        loginScreen.classList.add('hidden');
        programScreen.classList.remove('hidden');
    });

    // 疑問投稿
    postQuestionBtn.addEventListener('click', () => {
        eWisdomScreen.classList.remove('hidden');
    });

    // e-wisdom
    eWisdomBtn.addEventListener('click', () => {
        eWisdomScreen.classList.remove('hidden');
    });

    // 疑問の投稿
    submitQuestionBtn.addEventListener('click', () => {
        const question = document.getElementById('question-input').value;
        alert('質問が投稿されました');
        document.getElementById('question-input').value = '';
    });

    // 質問一覧の表示
    viewQuestionsBtn.addEventListener('click', () => {
        const questionList = ['質問1', '質問2', '質問3'];
        const questionsListDiv = document.getElementById('questions-list');
        questionsListDiv.innerHTML = '';
        questionList.forEach(question => {
            const div = document.createElement('div');
            div.textContent = question;
            questionsListDiv.appendChild(div);
        });
    });

    // e-line
    eLineBtn.addEventListener('click', () => {
        eLineScreen.classList.remove('hidden');
    });

    // ユーザー検索
    searchUser.addEventListener('input', () => {
        friendsList.innerHTML = '';
        const searchValue = searchUser.value.toLowerCase();
        users.forEach(user => {
            if (user.username.toLowerCase().includes(searchValue)) {
                const div = document.createElement('div');
                div.textContent = user.username;
                div.addEventListener('click', () => {
                    alert(`${user.username}とトークを開始します`);
                });
                friendsList.appendChild(div);
            }
        });
    });

    // トーク機能
    sendMessageBtn.addEventListener('click', () => {
        const message = messageInput.value;
        const chatHistory = document.getElementById('chat-history');
        const div = document.createElement('div');
        div.textContent = message;
        chatHistory.appendChild(div);
        messageInput.value = '';
    });
});
