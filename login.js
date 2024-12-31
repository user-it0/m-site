document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('ログイン成功');
        window.location.href = 'index.html'; // ログイン後、ホーム画面に戻る
    } else {
        alert('メールアドレスまたはパスワードが間違っています');
    }
});