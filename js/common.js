// Cargar templates
async function loadTemplate(templatePath, targetElementId) {
    try {
        const response = await fetch(templatePath);
        document.getElementById(targetElementId).innerHTML = await response.text();
    } catch (error) {
        console.error(`Error loading template ${templatePath}:`, error);
    }
}

// Cargar todos los templates comunes
async function loadCommonTemplates() {
    await loadTemplate('../../common_html/header.html', 'header');
    await loadTemplate('../../common_html/nav.html', 'nav');
    await loadTemplate('../../common_html/footer.html', 'foot');
    await loadTemplate('../../common_html/menu.html', 'menu');
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
