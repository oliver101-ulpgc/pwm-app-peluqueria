document.addEventListener('DOMContentLoaded', async () => {
    await loadParcialCommonTemplates();

    let userData = JSON.parse(localStorage.getItem('userProfile'));

    if (!userData) {
        const data = await fetchData('../../../data/clients.json');
        if (!data || !data.data || data.data.length === 0) {
            console.error("No data available");
            return;
        }
        userData = data.data[0]; // Tomamos el primer usuario
        localStorage.setItem('userProfile', JSON.stringify(userData)); // Guardamos en localStorage
    }

    const generateProfileDetails = (user, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = `
            <main class="profile-container">
                <section class="profile-info">
                    <div class="profile-pic-large">
                        <img src="${user.image}" alt="Foto de perfil">
                    </div>
                </section>
                <section>
                    ${createEditableDetail("Nombre", "username", user.username)}
                    ${createEditableDetail("Email", "email", user.email)}
                    ${createEditableDetail("Teléfono", "phone_number", user.phone_number)}
                    ${createEditableDetail("Contraseña", "password", "************")}
                </section>
            </main>
        `;

        attachEventListeners();
    };

    const createEditableDetail = (label, key, value) => {
        return `
            <div class="detail" data-key="${key}">
                <label>${label}:</label>
                <span class="detail-value">${value}</span>
                <input type="text" class="edit-input" value="${value}" style="display: none;">
                <button class="btn edit-btn">Cambiar</button>
                <button class="btn save-btn" style="display: none;">Guardar</button>
            </div>
        `;
    };

    const attachEventListeners = () => {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const detailDiv = event.target.closest('.detail');
                toggleEditMode(detailDiv, true);
            });
        });

        document.querySelectorAll('.save-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const detailDiv = event.target.closest('.detail');
                const key = detailDiv.dataset.key;
                const newValue = detailDiv.querySelector('.edit-input').value;

                // Guardamos los cambios en localStorage
                userData[key] = key === "password" ? "************" : newValue;
                localStorage.setItem('userProfile', JSON.stringify(userData));

                // Salimos del modo edición
                toggleEditMode(detailDiv, false, newValue);
            });
        });
    };

    const toggleEditMode = (detailDiv, isEditing, newValue = null) => {
        const valueSpan = detailDiv.querySelector('.detail-value');
        const inputField = detailDiv.querySelector('.edit-input');
        const editBtn = detailDiv.querySelector('.edit-btn');
        const saveBtn = detailDiv.querySelector('.save-btn');

        if (isEditing) {
            valueSpan.style.display = "none";
            inputField.style.display = "inline-block";
            editBtn.style.display = "none";
            saveBtn.style.display = "inline-block";
            inputField.focus();
        } else {
            if (newValue !== null) valueSpan.textContent = newValue;
            valueSpan.style.display = "inline-block";
            inputField.style.display = "none";
            editBtn.style.display = "inline-block";
            saveBtn.style.display = "none";
        }
    };

    generateProfileDetails(userData, 'main_section');
});
