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

// Manejar clics y actualizar contador
function trackClicks(itemId, type) {
    const storageKey = `${type}_clicks`;
    let clicks = JSON.parse(localStorage.getItem(storageKey)) || {};
    clicks[itemId] = (clicks[itemId] || 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(clicks));
}

// Obtener datos del JSON
async function fetchData() {
    try {
        const response = await fetch('../../../data/data.json');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}