window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const questionId = urlParams.get('id');

    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    const question = questions[questionId];

    const questionDetailDiv = document.getElementById('question-detail');
    const title = document.createElement('h2');
    title.textContent = question.title;
    const body = document.createElement('p');
    body.textContent = question.body;
    questionDetailDiv.appendChild(title);
    questionDetailDiv.appendChild(body);

    // 回答を表示
    const answerList = document.getElementById('answer-list');
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        const answerText = document.createElement('p');
        answerText.textContent = answer;
        answerDiv.appendChild(answerText);
        answerList.appendChild(answerDiv);
    });

    // 回答投稿処理
    document.getElementById('answer-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const answerText = document.getElementById('answer-body').value;

        question.answers.push(answerText);
        localStorage.setItem('questions', JSON.stringify(questions));

        alert('回答が投稿されました！');
        window.location.reload(); // ページを再読み込みして新しい回答を表示
    });
};