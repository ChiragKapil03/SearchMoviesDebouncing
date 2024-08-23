let searchBar = document.getElementById('search');
let container = document.getElementById('container');
const suggestionsBox = document.getElementById('suggestions');


async function callMovie(movieName){
    let response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=13745254&s=${movieName}&page=1`);
    let result = await response.json();
    console.log(result); 
    showMovies(result)
}


searchBar.addEventListener('keyup',()=>{
    let value = searchBar.value;
    const betterFunction= debouncing(value,500);
    betterFunction();
    // console.log(betterFunction());
    
})
let timer;
function debouncing(name,delay){
    return function (){
        clearTimeout(timer);
        timer = setTimeout(() => {
            callMovie(name);
        }, delay);
    }
 
}

function showMovies(result){
    container.innerHTML='';
    result.Search.forEach(element => {
        let movieBox= document.createElement('div');
        movieBox.id = 'movieCon';
        let photo = document.createElement('img');
        photo.src = `${element.Poster}`;
        let title = document.createElement('h2');
        title.innerText = element.Title;
        let year = document.createElement('p');
        year.innerText = element.Year;
        movieBox.appendChild(photo)
        movieBox.appendChild(title)
        movieBox.appendChild(year)
        container.appendChild(movieBox);
    });
}
