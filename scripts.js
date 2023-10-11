//Setting up basic variables and linking these to HTML elements
const rootURL = "https://swapi.dev/api";
const characterList = document.getElementById("character-list");
const filmList = document.getElementById("film-list");

const nextPageBtn = document.getElementById("next-page");
const prevPageBtn = document.getElementById("prev-page");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

let currPage = 1; //Sets up the first page for the characters

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
    })
}

//Function to fetch and display characters based on page number
function fetchCharacters(page) {
    const apiURL = rootURL + `people/?page=${page}`;

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

nextPageBtn.addEventListener("click", () => {
    currPage++; //Increment the current page
    fetchCharacters(currPage); //Fetcches and displays the next set of characters
});

prevPageBtn.addEventListener("click", () => {
    currPage--; //Decrement the current page
    fetchCharacters(currPage);
});