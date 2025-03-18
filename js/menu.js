function toggleMenu() {
    const menu = document.getElementById("menuContainer");

    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
    } else {
        menu.classList.add("active");
    }
}