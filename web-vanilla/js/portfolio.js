document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();

    const data = await fetchData('../../../data/portfolio.json');
    if (!data) return;

    // Filtrar por tipo
    const primaryItems = data.data.filter(item => item.type === "hombre");
    const secondaryItems = data.data.filter(item => item.type === "mujer");

    // Generar tarjetas
    const generateCards = async (items, containerId) => {
        const cardTemplate = await fetchTemplate('./gallery-card.html');
        const container = document.getElementById(containerId);
        if (!container) return;
        items.forEach((item) => {
            const card = cardTemplate.cloneNode(true);
            card.querySelector('h3').textContent = item.name;
            const cardImg = card.querySelector('.gallery-image');
            cardImg.src = item.image;
            cardImg.alt = item.name;
            container.appendChild(card);
        })
    };

    // Renderizar tarjetas en sus respectivas secciones
    await generateCards(primaryItems, 'main_section');
    await generateCards(secondaryItems, 'secondary_section');
});

