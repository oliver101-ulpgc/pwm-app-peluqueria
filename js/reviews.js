function createReview(username, avatarURL, description, stars) {
    return `
    <article class="review">
        <div>
            <div class="review-avatar" style='background-image: url("${avatarURL}");'></div>
            <h3 class="review-username">${username}</h3>
            <h3 class="stars-display">${stars}</h3>
        </div>
        <div>
            <p class="review-description">${description}</p>
        </div>
    </article>
    `;
}

function createGraph(starsBars, count, mean) {
    const rows = starsBars.map((bar) => createGraphRow(
        bar.stars,
        bar.count,
        100 * bar.count / count
    )).join('');
    return `
    <section class="reviews-graph">
        <div class="half graph-info">
            <div>
                <p>${mean} ⭐</p>
                <p>${count} reseñas</p>
            </div>
        </div>
        <div class="half graph">${rows}</div>
    </section>
    `;
}

function createGraphRow(stars, count, percentage) {
    return `
    <div class="row">
        <div class="side-bar">
            <div>${stars}</div>
        </div>
        <div class="middle-bar">
            <div class="bar-container">
                <div class="bar" style='width: ${percentage}%'></div>
            </div>
        </div>
        <div class="side-bar right-bar">
            <div>${count}</div>
        </div>
    </div>
    `;
}

function addReviews(data) {
    const reviewsParent = document.getElementById('reviews');
    if (!reviewsParent) return;
    reviewsParent.innerHTML = data.data.map((review) => createReview(
        review.client.username,
        review.client.image,
        review.text,
        '⭐'.repeat(parseInt(review.stars))
    )).join('');
}

function addGraph(data) {
    const reviewsGraphParent = document.getElementById('graph');
    if (!reviewsGraphParent) return;
    reviewsGraphParent.innerHTML = createGraph(
        data.bars,
        data.meta.total_reviews,
        data.meta.average_rating
    );
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();

    const graphData = await fetchData('../../../data/reviews-graph.json');
    if (!graphData) return;
    addGraph(graphData);

    const reviewData = await fetchData('../../../data/reviews.json');
    if (!reviewData) return;
    addReviews(reviewData);
});
