async function addReviews(data) {
    const reviewsParent = document.getElementById('reviews');
    if (!reviewsParent) return;

    const reviewTemplate = await fetchTemplate('./review.html');
    data.data.forEach(review => {
        const reviewNode = reviewTemplate.cloneNode(true);
        reviewNode.querySelector('.review-avatar').style.backgroundImage = `url(${review.client.image})`;
        reviewNode.querySelector('.review-username').textContent = review.client.username;
        reviewNode.querySelector('.review-description').textContent = review.text;
        reviewNode.querySelector('.stars-display').textContent = '⭐'.repeat(parseInt(review.stars));
        reviewsParent.appendChild(reviewNode);
    });
}

async function addGraph(data) {
    const graphContainer = document.getElementById('graph');
    if (!graphContainer) return;
    const graphSections = await fetchTemplate('./reviews-graph.html');
    graphSections.querySelector('.reviews-mean').textContent = `${data.meta.average_rating} ⭐`;
    graphSections.querySelector('.reviews-count').textContent = data.meta.total_reviews;

    const graphParent = graphSections.querySelector('.graph');
    const rowTemplate = await fetchTemplate('./graph-row.html');
    data.bars.forEach(bar => {
        const rowNode = rowTemplate.cloneNode(true);
        rowNode.querySelector('.row-stars').textContent = bar.stars;
        rowNode.querySelector('.bar').style.width = `${100 * bar.count / data.meta.total_reviews} %`;
        rowNode.querySelector('.row-count').textContent = bar.count;
        graphParent.appendChild(rowNode);
    });
    graphSections.appendChild(graphParent);
    graphContainer.appendChild(graphSections);
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();

    const graphData = await fetchData('../../../data/reviews-graph.json');
    if (!graphData) return;
    await addGraph(graphData);

    const reviewData = await fetchData('../../../data/reviews.json');
    if (!reviewData) return;
    await addReviews(reviewData);
});
