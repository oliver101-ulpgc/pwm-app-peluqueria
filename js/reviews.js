async function addReviews(data) {
    const reviewsParent = document.getElementById('reviews');
    if (!reviewsParent) return;
    reviewsParent.innerHTML = [...data.data].map((review) => createReview(
        review.client.username,
        '../Images/avatar.png',  // TODO: add review.client.avatar,
        review.text,
        '⭐'.repeat(parseInt(review.stars))
    )).join('');
}

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

// TODO
function createGraph() {
    return `
<section class="reviews-graph">
    <div class="half graph-info">
        <div>
            <p>4,1 ⭐</p>
            <p>254 reseñas</p>
        </div>
    </div>
    <div class="half graph">
        <div class="row">
            <div class="side-bar">
                <div>5</div>
            </div>
            <div class="middle-bar">
                <div class="bar-container">
                    <div class="bar-5 bar"></div>
                </div>
            </div>
            <div class="side-bar right-bar">
                <div>150</div>
            </div>
        </div>
        <div class="row">
            <div class="side-bar">
                <div>4</div>
            </div>
            <div class="middle-bar">
                <div class="bar-container">
                    <div class="bar-4 bar"></div>
                </div>
            </div>
            <div class="side-bar right-bar">
                <div>63</div>
            </div>
        </div>
        <div class="row">
            <div class="side-bar">
                <div>3</div>
            </div>
            <div class="middle-bar">
                <div class="bar-container">
                    <div class="bar-3 bar"></div>
                </div>
            </div>
            <div class="side-bar right-bar">
                <div>15</div>
            </div>
        </div>
        <div class="row">
            <div class="side-bar">
                <div>2</div>
            </div>
            <div class="middle-bar">
                <div class="bar-container">
                    <div class="bar-2 bar"></div>
                </div>
            </div>
            <div class="side-bar right-bar">
                <div>6</div>
            </div>
        </div>
        <div class="row">
            <div class="side-bar">
                <div>1</div>
            </div>
            <div class="middle-bar">
                <div class="bar-container">
                    <div class="bar-1 bar"></div>
                </div>
            </div>
            <div class="side-bar right-bar">
                <div>20</div>
            </div>
        </div>
    </div>
</section>
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCommonTemplates();

    const data = await fetchData('../../../data/reviews.json');
    if (!data) return;

    await loadTemplate('./graph.html', 'graph');
    await addReviews(data);
});
