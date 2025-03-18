document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();
    const fetchData = async (json) => {
        try {
            const response = await fetch(json);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching profile data:', error);
            return null;
        }
    };

    const data = await fetchData('../../../data/location.json');
    const data2 = await fetchData('../../../data/hairdressers.json');
    if (!data || !data.data || data.data.length === 0) {
        console.error("No data available");
        return;
    }

    const generateLocationDetails = (data, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = `
            <img src="../Images/Ubicacion.jpg" width="200" height="200">
            <div>
            <p>${data.address}</p>
            <p>${data.phone_number}</p>
            <p>${data.email}</p>
        </div>
        `;
    };

    // Función para generar los detalles del perfil dinámicamente
    const generateHairdresserDetails = (items, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = items.map(item => `
            <div class="trabajador" id="trabajador1">
                <img src="${item.image}" width="100" height="100">
                <p>${item.name}</p>
            </div>
        `).join('');
    };

    generateLocationDetails(data.data[0], 'main');
    generateHairdresserDetails(data2.data, 'secundary');
});
