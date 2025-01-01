// ユーザー登録フォームの処理
document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    // サイト作成者への通知（例: ログに出力）
    console.log("新しいユーザーが登録されました:");
    console.log("メールアドレス:", email);
    console.log("パスワード:", password);
    console.log("アカウント名:", username);

    alert("登録が完了しました！");
});

// 疑問を投稿する機能
document.getElementById("post-question-btn").addEventListener("click", function() {
    const question = document.getElementById("question-input").value;
    if (question) {
        const questionDiv = document.createElement("div");
        questionDiv.textContent = question;
        document.getElementById("question-list").appendChild(questionDiv);
        document.getElementById("question-input").value = '';  // 入力をクリア
    } else {
        alert("質問を入力してください。");
    }
});

// 質問への回答機能
document.getElementById("submit-answer-btn").addEventListener("click", function() {
    const answer = document.getElementById("answer-input").value;
    if (answer) {
        const answerDiv = document.createElement("div");
        answerDiv.textContent = answer;
        document.getElementById("answers-list").appendChild(answerDiv);
        document.getElementById("answer-input").value = '';  // 入力をクリア
    } else {
        alert("回答を入力してください。");
    }
});