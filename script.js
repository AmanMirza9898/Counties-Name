const CardContainer = document.querySelector('.card-container');
const filterBar = document.querySelector('.filter-bar');
const searchBar = document.querySelector('.search-bar input');
const TheamChanger = document.querySelector('.theam-changer');

let allCountries = [];

// 🌍 Function to Display Countries
const displayCountries = (countries) => {
    CardContainer.innerHTML = "";

    if (!Array.isArray(countries) || countries.length === 0) {
        CardContainer.innerHTML = "<p>No countries found</p>";
        return;
    }

    countries.forEach(country => {
        const capital = country.capital ? country.capital[0] : "N/A";

        const CountryCards = document.createElement('a');
        CountryCards.classList.add('country-cards');
        CountryCards.href = `./country.html?name=${country.name.common}`;

        const cardHTML = `
            <img src="${country.flags.svg}" alt="">
            <div class="card-text">
                <h1>${country.name.common}</h1>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${capital}</p>
            </div>
        `;
        CountryCards.innerHTML = cardHTML;
        CardContainer.append(CountryCards);
    });
};

// 🌍 Fetch All Countries Initially
const fetchCountries = (url) => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            allCountries = data;
            displayCountries(allCountries);
        })
        .catch((error) => console.error("Error fetching data:", error));
};

// 🌎 Filter Countries Based on Region
filterBar.addEventListener('change', () => {
    const selectedRegion = filterBar.value;
    fetchCountries(selectedRegion ? `https://restcountries.com/v3.1/region/${selectedRegion}` : "https://restcountries.com/v3.1/all");
});

// 🔍 Search Bar Event Listener
searchBar.addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase();
    displayCountries(allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery)
    ));
});

// 🌍 Load All Countries Initially
fetchCountries("https://restcountries.com/v3.1/all");

// 🌙🌞 Theme Changer with Local Storage
const updateThemeIcon = () => {
    TheamChanger.innerHTML = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
};

TheamChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateThemeIcon();
});

// ✅ Apply saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon();
});
