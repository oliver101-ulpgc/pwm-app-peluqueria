document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();
    const fetchData = async () => {
        try {
            const response = await fetch('../../../data/hairdressers.json');
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching profile data:', error);
            return null;
        }
    };

    const data = await fetchData();
    if (!data || !data.data || data.data.length === 0) {
        console.error("No data available");
        return;
    }

    // Función para generar los detalles del perfil dinámicamente
    const generateProfileDetails = (items, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = items.map(item => `
            <div class="trabajador" id="trabajador1">
                <img src="${item.image}" width="100" height="100">
                <p>${item.name}</p>
            </div>
        `).join('');
    };

    generateProfileDetails(data.data, 'secundary');
});
