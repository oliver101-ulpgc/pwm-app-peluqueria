document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    localStorage.setItem('isLogged', 'true');
    window.location.href = '../home/index.html';
});