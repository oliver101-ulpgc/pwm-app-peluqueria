async function addReviews(data) {
    let reviewTemplate = await fetchTemplate('./review.html',);
    let reviews_parent = document.getElementById('reviews');
    [...data.data].forEach((review) => {
        const reviewElement = reviewTemplate.cloneNode(true);

        const username = reviewElement.querySelector('h3');
        if (username) {
            username.textContent = review.client.username;
        }
        const description = reviewElement.querySelector('p');
        if (description) {
            description.textContent = review.text;
        }
        const starsDisplay = reviewElement.querySelector('.stars-display');
        if (starsDisplay) {
            starsDisplay.textContent = '⭐'.repeat(parseInt(review.stars));
        }
        // TODO: add user avatar and stars
        const stars = reviewElement.querySelector('.star');
        if (stars) {
            // TODO
        }

        reviews_parent.appendChild(reviewElement);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();

    const data = await fetchData('../../../data/reviews.json');
    if (!data) return;

    await loadTemplate('./graph.html', 'graph');
    await addReviews(data);
});
