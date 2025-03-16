// Cargar templates
async function loadTemplate(templateName, targetElementId) {
    try {
        const response = await fetch(`../../common_html/${templateName}.html`);
        const html = await response.text();
        document.getElementById(targetElementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading template ${templateName}:`, error);
    }
}

// Cargar todos los templates comunes
async function loadCommonTemplates() {
    await loadTemplate('header', 'header');
    await loadTemplate('nav', 'nav');
    await loadTemplate('footer', 'foot');
    await loadTemplate('menu', 'menu');
}

// Obtener datos del JSON
async function fetchData(jsonPath) {
    try {
        const response = await fetch(jsonPath);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}