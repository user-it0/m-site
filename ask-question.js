document.getElementById('ask-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('question-title').value;
    const body = document.getElementById('question-body').value;

    const questionData = {
        title: title,
        body: body,
        answers: [] // 回答は最初は空
    };

    // ローカルストレージに保存
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions.push(questionData);
    localStorage.setItem('questions', JSON.stringify(questions));

    alert('質問が投稿されました！');
    window.location.href = 'index.html'; // 投稿後、ホーム画面に戻る
});