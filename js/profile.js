document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();
    const fetchData = async () => {
        try {
            const response = await fetch('../../../data/clients.json');
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

    const user = data.data[0]; // Selecciona el primer usuario

    // Verificar que los elementos existen antes de actualizarlos
    const profilePic = document.querySelector(".profile-pic-large img");
    const profileName = document.querySelector(".profile-info h1");
    const detailSpans = document.querySelectorAll(".profile-details .detail span");

    if (profilePic) profilePic.src = user.image;
    if (profileName) profileName.textContent = user.username;
    if (detailSpans.length >= 3) {
        detailSpans[0].textContent = user.username;
        detailSpans[1].textContent = user.email;
        detailSpans[2].textContent = user.phone_number;
    }

    // Función para generar los detalles del perfil dinámicamente
    const generateProfileDetails = (user, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = `
            <main class="profile-container">
            <section class="profile-info">
            <div class="profile-pic-large">
                <img src="${user.image}" alt="Foto de perfil"></img>
            </div>
            <section>
            <div class="detail">
                <label>Nombre:</label>
                <span>${user.username}</span>
                <button class="btn">Cambiar</button>
            </div>
            <div class="detail">
                <label>Email:</label>
                <span>${user.email}</span>
                <button class="btn">Cambiar</button>
            </div>
            <div class="detail">
                <label>Teléfono:</label>
                <span>${user.phone_number}</span>
                <button class="btn">Cambiar</button>
            </div>
            <div class="detail">
                <label>Contraseña:</label>
                <span>************</span>
                <button class="btn">Cambiar</button>
            </div>
            <main>
        `;
    };

    generateProfileDetails(user, 'main_section');
});
