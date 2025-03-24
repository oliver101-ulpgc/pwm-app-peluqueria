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

    const generateProfileDetails = async (user, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        const main = await fetchTemplate('./profile-container.html');
        const image = main.querySelector('.profile-pic-large img');
        image.src = user.image;
        image.alt = user.name;

        const fieldTemplate = await fetchTemplate('./profile-field.html');
        const details = main.querySelector('.profile-details-container');
        createEditableDetail("Nombre", "username", user.username, fieldTemplate, details);
        createEditableDetail("Email", "email", user.email, fieldTemplate, details);
        createEditableDetail("Teléfono", "phone_number", user.phone_number, fieldTemplate, details);
        createEditableDetail("Contraseña", "password", "************", fieldTemplate, details);

        container.appendChild(main);
        attachEventListeners();
    };

    const createEditableDetail = (label, key, value, template, parent) => {
        const detail = template.cloneNode(true);
        detail.querySelector('label').textContent = `${label}:`;
        detail.querySelector('.detail-value').textContent = value;
        detail.querySelector('input').value = value;
        parent.appendChild(detail);
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

    await generateProfileDetails(userData, 'main_section');
});
