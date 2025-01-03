document.addEventListener('DOMContentLoaded', () => {
    // 各画面要素の取得
    const loginScreen = document.getElementById('login-screen');
    const signupScreen = document.getElementById('signup-screen');
    const programScreen = document.getElementById('program-screen');
    const eWisdomScreen = document.getElementById('e-wisdom-screen');
    const eLineScreen = document.getElementById('e-line-screen');

    // ログイン画面
    const createAccountBtn = document.getElementById('create-account-btn');
    const loginBtn = document.getElementById('login-btn');

    // サインアップ画面
    const signupBtn = document.getElementById('signup-btn');
    const backToLoginBtn = document.getElementById('back-to-login');

    // プログラム画面
    const eWisdomBtn = document.getElementById('e-wisdom-btn');
    const eLineBtn = document.getElementById('e-line-btn');

    // e-wisdom画面
    const postQuestionBtn = document.getElementById('post-question-btn');
    const viewQuestionsBtn = document.getElementById('view-questions-btn');

    // e-line画面
    const sendRequestBtn = document.getElementById('send-request-btn');
    const userSearch = document.getElementById('user-search');
    const userList = document.getElementById('user-list');

    // 初期表示（ログイン画面）
    loginScreen.classList.remove('hidden');

    // 新規作成ボタン
    createAccountBtn.addEventListener('click', () => {
        loginScreen.classList.add('hidden');
        signupScreen.classList.remove('hidden');
    });

    // ログインボタン
    loginBtn.addEventListener('click', () => {
        loginScreen.classList.add('hidden');
        programScreen.classList.remove('hidden');
    });

    // サインアップ画面に戻る
    backToLoginBtn.addEventListener('click', () => {
        signupScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    });

    // サインアップボタン
    signupBtn.addEventListener('click', () => {
        // ユーザー登録処理がここに入ります
        signupScreen.classList.add('hidden');
        programScreen.classList.remove('hidden');
    });

    // e-wisdomボタン
    eWisdomBtn.addEventListener('click', () => {
        programScreen.classList.add('hidden');
        eWisdomScreen.classList.remove('hidden');
    });

    // e-lineボタン
    eLineBtn.addEventListener('click', () => {
        programScreen.classList.add('hidden');
        eLineScreen.classList.remove('hidden');
    });

    // 質問投稿ボタン
    postQuestionBtn.addEventListener('click', () => {
        alert('質問が投稿されました');
    });

    // 質問一覧ボタン
    viewQuestionsBtn.addEventListener('click', () => {
        alert('質問一覧を表示');
    });

    // ユーザーリストを表示
    sendRequestBtn.addEventListener('click', () => {
        const username = userSearch.value;
        if (username) {
            const li = document.createElement('li');
            li.textContent = username;
            userList.appendChild(li);
        }
    });
});
