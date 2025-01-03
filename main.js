document.addEventListener("DOMContentLoaded", function () {
    const loginScreen = document.querySelector(".login-screen");
    const accountCreationScreen = document.querySelector(".account-creation-screen");
    const programScreen = document.querySelector(".program-screen");

    // ログインボタンの処理
    document.getElementById("loginBtn").addEventListener("click", function () {
        const username = document.getElementById("username").value.trim();
        if (username) {
            loginScreen.style.display = "none";
            programScreen.style.display = "flex";
        } else {
            alert("ユーザー名を入力してください。");
        }
    });

    // 新規アカウント作成ボタンの処理
    document.getElementById("createAccountBtn").addEventListener("click", function () {
        loginScreen.style.display = "none";
        accountCreationScreen.style.display = "flex";
    });

    // アカウント作成ボタンの処理
    document.getElementById("createBtn").addEventListener("click", function () {
        const newUsername = document.getElementById("newUsername").value.trim();
        const password = document.getElementById("password").value.trim();
        if (newUsername && password) {
            accountCreationScreen.style.display = "none";
            programScreen.style.display = "flex";
        } else {
            alert("すべてのフィールドを入力してください。");
        }
    });

    // 戻るボタンの処理
    document.getElementById("backBtn").addEventListener("click", function () {
        accountCreationScreen.style.display = "none";
        loginScreen.style.display = "flex";
    });

    // プログラム画面のボタン処理
    document.getElementById("postQuestionBtn").addEventListener("click", function () {
        alert("疑問を投稿する機能は未実装です。");
    });

    document.getElementById("answerQuestionBtn").addEventListener("click", function () {
        alert("回答する機能は未実装です。");
    });

    document.getElementById("eWisdomBtn").addEventListener("click", function () {
        alert("e-wisdom機能は未実装です。");
    });

    document.getElementById("eLineBtn").addEventListener("click", function () {
        alert("e-line機能は未実装です。");
    });
});