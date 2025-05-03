function toggleAnswer(button) {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');  // Alterna la clase 'active' para mostrar u ocultar la respuesta
}

async function loadFAQ() {
    const faqContainer = document.querySelector(".faq-container");
    if (!faqContainer) return;

    const data = await fetchData("../../../data/faq.json");
    if (!data || !data.data) return;

    const response = await fetch("faq-item.html");
    const faqItemTemplate = await response.text();

    data.data.forEach(faq => {
        const faqItem = document.createElement("div");
        faqItem.innerHTML = faqItemTemplate
            .replace("question-text", faq.question)
            .replace("answer-text", faq.answer);
        faqContainer.appendChild(faqItem);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadCommonTemplates();
    await loadFAQ();
});
