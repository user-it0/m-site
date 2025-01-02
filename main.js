document.addEventListener('DOMContentLoaded', function() {
    // 新規アカウント作成ボタン
    const createAccountButton = document.getElementById('create-account');
    createAccountButton.addEventListener('click', function() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('signup-screen').style.display = 'block';
    });

    // アカウント作成
    const signupButton = document.getElementById('signup-btn');
    signupButton.addEventListener('click', function() {
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('password').value;
        if (username && password) {
            // 新規ユーザー作成のロジック
            alert('アカウントが作成されました');
            document.getElementById('signup-screen').style.display = 'none';
            document.getElementById('program-screen').style.display = 'block';
        } else {
            alert('ユーザー名とパスワードを入力してください');
        }
    });

    // e-wisdomボタン
    const eWisdomButton = document.getElementById('e-wisdom-btn');
    eWisdomButton.addEventListener('click', function() {
        document.getElementById('program-screen').style.display = 'none';
        document.getElementById('e-wisdom-screen').style.display = 'block';
    });

    // e-lineボタン
    const eLineButton = document.getElementById('e-line-btn');
    eLineButton.addEventListener('click', function() {
        document.getElementById('program-screen').style.display = 'none';
        document.getElementById('e-line-screen').style.display = 'block';
    });

    // 質問投稿
    const postQuestionButton = document.getElementById('post-question');
    postQuestionButton.addEventListener('click', function() {
        const questionInput = document.getElementById('question-input').value;
        if (questionInput) {
            const questionElement = document.createElement('div');
            questionElement.textContent = questionInput;
            document.getElementById('questions-list').appendChild(questionElement);
            document.getElementById('question-input').value = '';
        }
    });

    // トークリクエスト送信
    const sendRequestButton = document.getElementById('send-request');
    sendRequestButton.addEventListener('click', function() {
        const userSearchInput = document.getElementById('search-user').value;
        if (userSearchInput) {
            const requestElement = document.createElement('div');
            requestElement.textContent = `リクエスト送信: ${userSearchInput}`;
            document.getElementById('request-list').appendChild(requestElement);
        }
    });
});