window.onload = function() {
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    const questionList = document.getElementById('question-list');

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const title = document.createElement('h3');
        title.textContent = question.title;
        questionDiv.appendChild(title);

        const questionLink = document.createElement('a');
        questionLink.textContent = "詳細を見る";
        questionLink.href = `question-detail.html?id=${index}`;
        questionDiv.appendChild(questionLink);

        questionList.appendChild(questionDiv);
    });
};