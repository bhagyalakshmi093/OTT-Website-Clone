document.addEventListener('DOMContentLoaded', function() {
    // let contentData = [];

    // fetch('assets/data/content.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         contentData = data;
    //         renderContent();
    //     });
    [
        {
            "id": 1,
            "title": "Movie 1",
            "type": "movie",
            "category": "trending",
            "description": "hello welcome new movie for Movie 1",
            "image": "images/movies/movie2.jpg"
        },
        {
            "id": 2,
            "title": "Series 1",
            "type": "series",
            "category": "trending",
            "description": "hello welcome to new series for Series 1",
            "image": "images/series/series1.png"
        }
        // More content objects
    ]

    function renderContent() {
        const trendingMovies = contentData.filter(item => item.category === 'trending' && item.type === 'movie');
        const trendingSeries = contentData.filter(item => item.category === 'trending' && item.type === 'series');
        const recommendedContent = contentData.filter(item => item.category === 'recommended');

        displayContent(trendingMovies, 'trending-movies');
        displayContent(trendingSeries, 'trending-series');
        displayContent(recommendedContent, 'recommended-content');
    }

    function displayContent(contentArray, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        contentArray.forEach(item => {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'item';
            contentDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="content.html?id=${item.id}">More Info</a>
            `;
            container.appendChild(contentDiv);
        });
    }

    function searchContent(query) {
        const results = contentData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        displayContent(results, 'trending-movies');
        displayContent(results, 'trending-series');
        displayContent(results, 'recommended-content');
    }

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function() {
        const query = searchInput.value;
        searchContent(query);
    });

    if (window.location.pathname.endsWith('content.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const contentId = urlParams.get('id');
        const contentItem = contentData.find(item => item.id == contentId);

        if (contentItem) {
            const contentDetails = document.getElementById('content-details');
            contentDetails.innerHTML = `
                <h2>${contentItem.title}</h2>
                <img src="${contentItem.image}" alt="${contentItem.title}">
                <p>${contentItem.description}</p>
            `;
        }
    } else {
        fetch('images/data/content.json')
        .then(response => response.json())
        .then(data => {
        contentData = data;
        renderContent();
    });
    }
});
