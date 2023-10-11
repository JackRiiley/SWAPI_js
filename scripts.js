//Setting up basic variables and linking these to HTML elements
const rootURL = "https://swapi.dev/api";
const characterList = document.getElementById("character-list");
const filmList = document.getElementById("film-list");

const nextPageBtn = document.getElementById("next-page");
const prevPageBtn = document.getElementById("prev-page");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

let currPage = 1; //Sets up the first page for the characters



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