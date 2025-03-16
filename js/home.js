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
    const allItems = [...data.data]
        .map(item => ({
            ...item,
            clicks: JSON.parse(localStorage.getItem(`${item.type}_clicks`))?.[item.id] || 0
        }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 6);

    // Generar HTML
    const container = document.getElementById('main_section');
    container.innerHTML = allItems.map(item => `
        <article class="container_service-card">
            <a href="${'service'}.html?id=${item.id}" 
               onclick="trackClicks(${item.id}, '${item.type}')">
                
                <img src="${item.image}" alt="${item.title}" class="service-content">
                
                <div class="container_service-card">
                    <h3>${item.title}</h3>
                    <p>${item.price_euro}</p>
                    <p>${item.duration_minutes}</p>
                    ${item.clicks} ${item.clicks === 1 ? 'click' : 'clicks'}
                </div>
            </a>
        </article>
    `).join('');

    const container2 = document.getElementById('secundary_section');
    container2.innerHTML = allItems.map(item => `
        <article class="container_service-card">
            <a href="${'service'}.html?id=${item.id}" 
               onclick="trackClicks(${item.id}, '${item.type}')">
                
                <img src="${item.image}" alt="${item.title}" class="service-content">
                
                <div class="container_service-card">
                    <h3>${item.title}</h3>
                    <p>${item.price_euro}</p>
                    <p>${item.duration_minutes}</p>
                    ${item.clicks} ${item.clicks === 1 ? 'click' : 'clicks'}
                </div>
            </a>
        </article>
    `).join('');
});
