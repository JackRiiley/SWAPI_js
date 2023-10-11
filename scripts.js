//Setting up basic variables and linking these to HTML elements
const rootURL = "https://swapi.dev/api";
const characterList = document.getElementById("character-list");
const filmList = document.getElementById("film-list");

const nextPageBtn = document.getElementById("next-page");
const prevPageBtn = document.getElementById("prev-page");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

let currPage = 1; //Sets up the first page for the characters

//Function to fetch Planet Info by URL
function fetchPlanetInfo(planetURL, cardEl) {
    fetch(planetURL)
    .then((res) => res.json())
    .then((data) => {
        //Populate the character card with the planet name
        const planetEl = document.createElement('p');
        planetEl.textContent = `Homeworld: ${data.name}`;
        cardEl.appendChild(planetEl);
    })
    .catch((err) => {
        console.log("Error fetching planet Info: ", err);
    });
}

//Function to fetch film information by URL
function fetchFilmInfo(filmURL, cardEl) {
    fetch(filmURL)
    .then((res) => res.json())
    .then((data) => {
        //Populate the charcter card with film names
        const filmInfo = document.createElement('p');
        filmInfo.textContent = `Film: ${data.title}`;
        cardEl.appendChild(filmInfo);
    });
}

//Function to populate the 'character card' with information from the API
function populateCharacterCard(characters) {
    characterList.textContent = ''; //Clears the character list to start from nothing

    characters.forEach((character) => {
        //Sets up ther blank card for each character
        const cardEl = document.createElement("div");
        cardEl.setAttribute('class', 'card');

        //Name element
        const nameEl = document.createElement("h2");
        nameEl.textContent = character.name;

        cardEl.appendChild(nameEl);

        //Birth year element
        const birthYearEl = document.createElement('p');
        birthYearEl.textContent = `Birth Year: ${character.birth_year}`;

        cardEl.appendChild(birthYearEl);

        //Check for Home World URL - will run function to handle API call for this
        if (character.homeworld) {
            fetchPlanetInfo(character.homeworld, cardEl);
        }

        //As Films are held in array, need to cycle through them to gain all titles
        if (characters.films && characters.films.length > 0) {
            characters.films.forEach((filmURL) => {
                fetchFilmInfo(filmURL, cardEl);
            });
        }

        characterList.appendChild(cardEl);
    })
}

//Function to fetch and display characters based on page number
function fetchCharacters(page) {
    const apiURL = rootURL + `/people/?page=${page}`;

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        //Uses the below function to refactor code
        populateCharacterCard(data.results);

        currPage = page;
        })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });

}

//Initial Page Load
fetchCharacters(currPage);

nextPageBtn.addEventListener("click", () => {
    currPage++; //Increment the current page
    fetchCharacters(currPage); //Fetcches and displays the next set of characters
});

prevPageBtn.addEventListener("click", () => {
    currPage--; //Decrement the current page
    fetchCharacters(currPage);
});