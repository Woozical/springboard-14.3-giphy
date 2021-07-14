const key = 'dl3Nguz5OZ7Pgmijm5sJcE6ow0PAx0R0';
console.log("Let's get this party started!");

async function searchGifs(searchTerm){
    const queries = {'api_key': key, 'q': searchTerm};
    let response;
    // Send the request to Giphy API
    try{
        response = await axios.get('https://api.giphy.com/v1/gifs/search', {
            params: queries,
            timeout: 10000
        });
        console.log(response.data);
    } catch (err) {
        alert('Sorry! Cannot reach the Giphy API at this time. Error Message:' + err.message);
    }

    // Handle no search results
    if (response.data.data.length === 0){
        alert('The search yielded no results. Try a different term or leave the field empty to get a random GIF.')
        return;
    }
    // Append to DOM
    const randomGif = randomChoice(response.data.data);
    appendGif(randomGif.images['downsized_medium'].url);
}

async function randomGif(){
    const queries = {'api_key': key};
    //Send the rquest to Giphy API
    try {
        const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
            params: queries,
            timeout: 10000
        });
        console.log(response);
        appendGif(response.data.data.images['downsized_medium'].url);
    } catch (err) {
        alert('Sorry! Cannot reach the Giphy API at this time. Error Message:' + err.message);
    }

}

function appendGif(url){
    $('<img>')
    .attr({src: url, alt: 'Could not load image'})
    .appendTo($('#results'));
}

function randomChoice(array){
    return array[Math.trunc(Math.random() * array.length)];
}

$('form').on('submit', function(e){
    e.preventDefault();;
    const searchTerm = this.searchField.value;
    
    // Giphy API requires a non-empty string to query the search endpoint
    if (searchTerm){
        searchGifs(searchTerm);
    } else {
        randomGif();
    }
    
    this.searchField.value = '';
});

$('#delete').click(function(e){
    e.preventDefault();
    console.log('removed');
    $('#results').empty();
})
