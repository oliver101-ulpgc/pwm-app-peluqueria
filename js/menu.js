function toggleMenu() {
    const menu = document.getElementById("menuContainer");

    // Si el menú no ha sido mostrado antes, lo mostramos
    if (menu.style.display === "none") {
        menu.style.display = "flex";  // Lo mostramos con flex
        setTimeout(() => {  // Usamos un pequeño retraso para asegurar la animación
            menu.classList.add("active");
        }, 10);  // Añadimos un pequeño retraso antes de activar la animación
    } else {
        menu.classList.remove("active");
        setTimeout(() => {
            menu.style.display = "none";  // Ocultamos el menú después de la animación
        }, 300);  // El tiempo de espera debe coincidir con la duración de la animación
    }
}