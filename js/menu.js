function toggleMenu() {
    const menu = document.getElementById("menuContainer");

    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
    } else {
        menu.classList.add("active");
    }
}

function logout() {
    localStorage.setItem("isLogged", "false"); // Marcar como desconectado
    window.location.href = "../../html/home/index.html"; // Redirigir a inicio
}