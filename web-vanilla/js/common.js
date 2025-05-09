// Cargar templates
async function loadTemplate(templatePath, targetElementId) {
    try {
        const response = await fetch(templatePath);
        document.getElementById(targetElementId).innerHTML = await response.text();
    } catch (error) {
        console.error(`Error loading template ${templatePath}:`, error);
    }
}

function handleHeader() {
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged === null || isLogged === 'false') {
        document.querySelector('#botones .profile-pic').style.display = "none";
    } else {
        document.querySelectorAll('#botones button').forEach(button => {
            button.style.display = "none";
        });
    }
}

// Cargar todos los templates comunes
async function loadCommonTemplates() {
    await loadParcialCommonTemplates();
    await loadTemplate('../../common_html/footer.html', 'foot');
}

async function loadParcialCommonTemplates() {
    await loadTemplate('../../common_html/header.html', 'header');
    await loadTemplate('../../common_html/nav.html', 'nav');
    await loadTemplate('../../common_html/menu.html', 'menu');
    handleHeader();
}

// Obtener contenido de los datos del JSON
async function fetchData(jsonPath) {
    try {
        const response = await fetch(jsonPath);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Devolver el template de un fichero
async function fetchTemplate(templatePath) {
    try {
        const response = await fetch(templatePath);
        const text = await response.text();
        const container = document.createElement('div');
        container.innerHTML = text;
        return container.firstElementChild;
    } catch (error) {
        console.error(`Error loading template ${templatePath}:`, error);
    }
}

function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active'); // Alternar la clase 'active' para mostrar u ocultar los enlaces
}