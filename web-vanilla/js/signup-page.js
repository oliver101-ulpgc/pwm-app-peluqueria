function inputListener(input) {
    return function () {
        if (!input.validity.valid) {
            input.reportValidity();
        }
    };
}

let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let phoneInput = document.getElementById("phone");
nameInput.addEventListener('change', inputListener(nameInput));
emailInput.addEventListener('change', inputListener(emailInput));
passwordInput.addEventListener('change', inputListener( passwordInput));
phoneInput.addEventListener('change', inputListener(phoneInput));

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    localStorage.setItem('isLogged', 'true');
    window.location.href = '../home/index.html';
});