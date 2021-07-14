const key = 'dl3Nguz5OZ7Pgmijm5sJcE6ow0PAx0R0';
let globalGif;
console.log("Let's get this party started!");

async function searchGifs(key, searchTerm){
    const queries = {'api_key': key, 'q': searchTerm};
    const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: queries,
        timeout: 10000
    });
    console.log(response.data);
    const randomGif = randomChoice(response.data.data);
    console.log(randomGif);
    //appendGif(randomGif.images['downsized medium'].url);
}

function appendGif(url){
    $('<img>')
    .attr('src', url)
    .appendTo($('#results'));
}

function randomChoice(array){
    return array[Math.trunc(Math.random() * array.length)];
}

$('form').on('submit', function(e){
    e.preventDefault();
    const searchTerm = this.searchField.value;
    searchGifs(key, searchTerm);
    this.searchField.value = '';
});


//response.data[index].images['downsized medium'].url