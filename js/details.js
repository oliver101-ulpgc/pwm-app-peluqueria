async function fetchData(json) {
    try {
        const response = await fetch(json);
        if (!response.ok) throw new Error('Failed to fetch data');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function addLocationDetails(data) {
    const mainContainer = document.getElementById('main');
    if (!mainContainer) return;

    const locationTemplate = await fetchTemplate('./main.html');
    locationTemplate.querySelector('.image').src  = data.image;
    locationTemplate.querySelector('.address').textContent = data.address;
    locationTemplate.querySelector('.telephone').textContent = data.phone_number;
    locationTemplate.querySelector('.mail').textContent = data.email;

    mainContainer.appendChild(locationTemplate);
}

async function addHairdressers(data) {
    const secondaryContainer = document.getElementById('secondary');
    const trabajadoresContainer = secondaryContainer.querySelector('.trabajadores');
    const hairdresserTemplate = await fetchTemplate('./hairdresser.html');

    data.forEach(hairdresser => {
        const hairdresserNode = hairdresserTemplate.cloneNode(true);

        // Corregir selectores: usa las clases correctas
        const imageElement = hairdresserNode.querySelector('.image');
        const nameElement = hairdresserNode.querySelector('.name');

        if (imageElement && nameElement) {
            imageElement.src = hairdresser.image;
            nameElement.textContent = hairdresser.name;
        }

        trabajadoresContainer.appendChild(hairdresserNode);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();

    const locationData = await fetchData('../../../data/location.json');
    if (locationData && locationData.data.length > 0) {
        await addLocationDetails(locationData.data[0]);
    }

    const hairdressersData = await fetchData('../../../data/hairdressers.json');
    if (hairdressersData && hairdressersData.data.length > 0) {
        await addHairdressers(hairdressersData.data);
    }
});