// Get references to the DOM elements
const searchBox = document.getElementById("search");
const searchButton = document.getElementById("searchBtn");
const newsContainer = document.getElementById("news-container");

// Function to fetch news articles based on a search query
async function fetchNews(query) {
    const API_KEY = "cc085a0314644b7389aa35220bda4930"; // API key for News API
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

    try {
        // Fetch data from the API
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`); // Handle HTTP errors
        }

        const data = await response.json();
        return data.articles; // Return the array of articles
    } catch (error) {
        console.error("Failed to fetch news:", error.message); // Log the error
        return null; // Return null if an error occurs
    }
}

// Function to display news articles in the news container
function displayNews(articles) {
    newsContainer.innerHTML = ""; // Clear the container before adding new articles

    // If no articles are available or an error occurred, show a message
    if (!articles || articles.length === 0) {
        const errorMessage = document.createElement("div");
        errorMessage.className = "no-news";
        errorMessage.textContent = "Unable to fetch news. Please try again later.";
        newsContainer.appendChild(errorMessage);
        return;
    }

    // Loop through each article and create a card to display it
    articles.forEach(article => {
        const articleDiv = document.createElement("div"); // Create a div for the article
        articleDiv.className = "article"; // Add a CSS class for styling
        articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || "No description available"}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleDiv); // Add the article card to the container
    });
}

// Function to fetch and display news based on the search query
async function getAndDisplayNews(query) {
    const articles = await fetchNews(query); // Fetch articles
    displayNews(articles); // Display articles or error message
}

// Add a click event listener to the search button
searchButton.addEventListener('click', () => {
    const query = searchBox.value; // Get the value entered in the search box

    // If the query is not empty, fetch and display the news
    if (query) {
        getAndDisplayNews(query);
    }
});
