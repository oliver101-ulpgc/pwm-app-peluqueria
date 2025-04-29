// Manejar clics y actualizar contador
function trackClicks(itemId, type) {
    const storageKey = `${type}_clicks`;
    let clicks = JSON.parse(localStorage.getItem(storageKey)) || {};
    clicks[itemId] = (clicks[itemId] || 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(clicks));
    window.location.href = `../booking/index.html?id=${itemId}`;
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
    const generateCards = async (items, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const serviceTemplate = await fetchTemplate('./service.html');
        items.forEach((item) => {
            const service = serviceTemplate.cloneNode(true);
            const image = service.querySelector('.service-content img');
            image.src = item.image;
            image.alt = item.title;
            service.querySelector('.service-title').textContent = item.title;
            service.querySelector('.service-price').textContent = `${item.price_euro}€`;
            service.querySelector('.service-duration').textContent = `${item.duration_minutes} min`;
            service.querySelector('.service-clicks').textContent = `${item.clicks} ${(item.clicks === 1) ? 'click' : 'clicks'}`;
            service.querySelector('.reserve-button').addEventListener('click', () => trackClicks(item.id, item.type.toString()))
            container.appendChild(service);
        });
    };

    // Renderizar tarjetas en sus respectivas secciones
    await generateCards(primaryItems, 'main_section');
    await generateCards(secondaryItems, 'secondary_section');
});

