document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    const userData = {
        email: email,
        password: password,
        username: username
    };

    // ローカルストレージに保存
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('登録が完了しました！');
    window.location.href = 'index.html'; // 登録後、ホーム画面に戻る
});