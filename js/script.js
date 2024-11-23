const btnfetchJoke = document.getElementById('fetchJoke');
const ulElement = document.getElementById('jokeList');

function obtenerChiste() {
    fetch(('https://api.chucknorris.io/jokes/random')).then((response) => {
        if (!response.ok) {
            throw 'Solicitud sin exito'
        }
        return response.json;
    })

    .then ((chiste) => {
        console.log(chiste)
        renderizarChiste(chiste);
    })
}

btnfetchJoke.addEventListener('click',function() {
    obtenerChiste();
})

