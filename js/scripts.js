document.addEventListener('DOMContentLoaded', () => {
    const createAccountBtn = document.getElementById('create-account-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');
    const postQuestionBtn = document.getElementById('post-question-btn');
    const eWisdomBtn = document.getElementById('e-wisdom-btn');
    const eLineBtn = document.getElementById('e-line-btn');
    const submitQuestionBtn = document.getElementById('submit-question-btn');
    const viewQuestionsBtn = document.getElementById('view-questions-btn');
    const searchUser = document.getElementById('search-user');
    const friendsList = document.getElementById('friends-list');
    const goLoginBtn = document.getElementById('go-login-btn');
    const goProgramBtn = document.getElementById('go-program-btn');

    // 新規作成ボタン
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    // サインアップ画面からログイン画面に戻る
    if (goLoginBtn) {
        goLoginBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // サインアップ完了
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            window.location.href = 'program.html';
        });
    }

    // ログイン画面に進む
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'program.html';
        });
    }

    // e-wisdom画面に進む
    if (eWisdomBtn) {
        eWisdomBtn.addEventListener('click', () => {
            window.location.href = 'ewisdom.html';
        });
    }

    // e-line画面に進む
    if (eLineBtn) {
        eLineBtn.addEventListener('click', () => {
            window.location.href = 'eline.html';
        });
    }

    // e-wisdomで質問投稿
    if (submitQuestionBtn) {
        submitQuestionBtn.addEventListener('click', () => {
            const question = document.getElementById('question-input').value;
            alert('質問が投稿されました');
            document.getElementById('question-input').value = '';
        });
    }

    // 質問一覧の表示
    if (viewQuestionsBtn) {
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
    }

    // e-line画面に戻る
    if (goProgramBtn) {
        goProgramBtn.addEventListener('click', () => {
            window.location.href = 'program.html';
        });
    }
});
