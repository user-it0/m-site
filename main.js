// 初期状態：ログイン画面を表示
document.getElementById("loginBtn").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    if (username) {
        // ログイン後、プログラム画面に遷移
        showProgramScreen();
    } else {
        alert("ユーザー名を入力してください");
    }
});

document.getElementById("createAccountBtn").addEventListener("click", function() {
    document.querySelector(".login-screen").style.display = "none";
    document.querySelector(".account-creation-screen").style.display = "flex";
});

document.getElementById("createBtn").addEventListener("click", function() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("password").value;
    if (username && password) {
        // アカウント作成後、プログラム画面に遷移
        showProgramScreen();
    } else {
        alert("すべての欄に入力してください");
    }
});

document.getElementById("backBtn").addEventListener("click", function() {
    document.querySelector(".account-creation-screen").style.display = "none";
    document.querySelector(".login-screen").style.display = "flex";
});

document.getElementById("postQuestionBtn").addEventListener("click", function() {
    document.querySelector(".program-screen").style.display = "none";
    document.querySelector(".e-wisdom-screen").style.display = "flex";
});

document.getElementById("eWisdomBtn").addEventListener("click", function() {
    document.querySelector(".program-screen").style.display = "none";
    document.querySelector(".e-wisdom-screen").style.display = "flex";
});

document.getElementById("eLineBtn").addEventListener("click", function() {
    document.querySelector(".program-screen").style.display = "none";
    document.querySelector(".e-line-screen").style.display = "flex";
});

document.getElementById("submitQuestionBtn").addEventListener("click", function() {
    const question = document.getElementById("questionInput").value;
    if (question) {
        alert("質問が投稿されました！");
        document.getElementById("questionInput").value = '';
    } else {
        alert("質問を入力してください");
    }
});

document.getElementById("showQuestionsBtn").addEventListener("click", function() {
    alert("質問一覧が表示されます");
});

document.getElementById("sendRequestBtn").addEventListener("click", function() {
    const searchUser = document.getElementById("searchUser").value;
    if (searchUser) {
        const li = document.createElement("li");
        li.textContent = searchUser + " (リクエスト待機中)";
        document.getElementById("requestList").appendChild(li);
        document.getElementById("searchUser").value = '';
    } else {
        alert("ユーザー名を入力してください");
    }
});

function showProgramScreen() {
    // ログイン画面とアカウント作成画面を非表示にし、プログラム画面を表示
    document.querySelector(".login-screen").style.display = "none";
    document.querySelector(".account-creation-screen").style.display = "none";
    document.querySelector(".program-screen").style.display = "flex";
}