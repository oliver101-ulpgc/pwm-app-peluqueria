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

async function addReviews(data) {
    const reviewsParent = document.getElementById('reviews');
    if (!reviewsParent) return;
    const reviewTemplate = await fetchTemplate();
    // TODO

    reviewsParent.innerHTML = data.data.map((review) => createReview(
        review.client.username,
        review.client.image,
        review.text,
        '⭐'.repeat(parseInt(review.stars))
    )).join('');
}

async function addGraph(data) {
    const graphContainer = document.getElementById('graph');
    if (!graphContainer) return;
    const graphSection = await fetchTemplate('./reviews-graph.html');
    {
        const meanText = graphSection.querySelector('.reviews-mean');
        meanText.textContent = `${data.meta.average_rating} ⭐`;

        const countText = graphSection.querySelector('.reviews-count');
        countText.textContent = data.meta.total_reviews;
    }

    const graphParent = graphSection.querySelector('.graph');
    const barTemplate = await fetchTemplate('./graph-row.html');
    data.bars.forEach(bar => {
        const row = barTemplate.cloneNode(true);

        const stars = row.querySelector('.row-stars');
        stars.textContent = bar.stars;

        const rowBar = row.querySelector('.bar');
        rowBar.style.width = (100 * bar.count / data.meta.total_reviews).toString() + `%`;

        const rowCount = row.querySelector('.row-count');
        rowCount.textContent = bar.count;

        graphParent.appendChild(row);
    });

    graphSection.appendChild(graphParent);
    graphContainer.appendChild(graphSection);
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();

    const graphData = await fetchData('../../../data/reviews-graph.json');
    if (!graphData) return;
    await addGraph(graphData);

    const reviewData = await fetchData('../../../data/reviews.json');
    if (!reviewData) return;
    addReviews(reviewData);
});
