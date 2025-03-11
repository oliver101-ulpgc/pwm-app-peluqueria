// home.js actualizado
document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();

    const data = await fetchData();
    if (!data) return;

    // Obtener y mezclar datos
    const allItems = [...data.plants, ...data.animals]
        .map(item => ({
            ...item,
            clicks: JSON.parse(localStorage.getItem(`${item.type}_clicks`))?.[item.id] || 0
        }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 6);

    // Generar HTML
    const container = document.getElementById('top-items');
    container.innerHTML = allItems.map(item => `
        <article class="card">
            <a href="${item.type === 'plant' ? 'plant' : 'animal'}.html?id=${item.id}" 
               class="card-link"
               onclick="trackClicks(${item.id}, '${item.type}')">
                
                <img src="${item.image}" alt="${item.title}" class="card-img">
                
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <span class="clicks-badge">
                        ${item.clicks} ${item.clicks === 1 ? 'click' : 'clicks'}
                    </span>
                </div>
            </a>
        </article>
    `).join('');
});
