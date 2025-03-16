// Manejar clics y actualizar contador
function trackClicks(itemId, type) {
    const storageKey = `${type}_clicks`;
    let clicks = JSON.parse(localStorage.getItem(storageKey)) || {};
    clicks[itemId] = (clicks[itemId] || 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(clicks));
}

// home.js actualizado
document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();

    const data = await fetchData('../../../data/data.json');
    if (!data) return;

    // Obtener y mezclar datos
    const allItems = data.data.map(item => ({
        ...item,
        clicks: JSON.parse(localStorage.getItem(`${item.type}_clicks`))?.[item.id] || 0
    }));

    // Ordenar por popularidad y limitar a los 6 más clickeados
    const sortedItems = [...allItems].sort((a, b) => b.clicks - a.clicks);

    // Filtrar por tipo
    const primaryItems = sortedItems.filter(item => item.type === "service");
    const secondaryItems = sortedItems.filter(item => item.type === "other_service");

    // Función para generar tarjetas
    const generateCards = (items, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = items.map(item => `
            <article class="container_service-card">
                <a href="../booking/index.html?id=${item.id}" 
                   onclick="trackClicks(${item.id}, '${item.type}')">
                    
                    <img src="${item.image}" alt="${item.title}" class="service-content">
                    
                    <div class="container_service-card">
                        <h3>${item.title}</h3>
                        <p>${item.price_euro} €</p>
                        <p>${item.duration_minutes} min</p>
                        ${item.clicks} ${item.clicks === 1 ? 'click' : 'clicks'}
                    </div>
                </a>
            </article>
        `).join('');
    };

    // Renderizar tarjetas en sus respectivas secciones
    generateCards(primaryItems, 'main_section');
    generateCards(secondaryItems, 'secondary_section');
});

