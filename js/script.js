const btnfetchJoke = document.getElementById('fetchJoke');
const ulElement = document.getElementById('jokeList');
const btnEliminar = document.getElementById('eliminarTodo');

function obtenerChiste() {
    fetch('https://api.chucknorris.io/jokes/random').then((response) => {
        if (!response.ok) {
            throw 'Solicitud sin exito'
        }
        return response.json();
    })
    .then ((chiste) => {
        console.log(chiste)
        renderizarChiste(chiste);
    })
}

btnfetchJoke.addEventListener('click', function() {
    obtenerChiste();
})

function renderizarChiste(chiste) {
    const {id, value, icon_url} = chiste;
    const copiaChiste = {...chiste}

    const liElemnent = document.createElement('li');
    liElemnent.id = id;

    const divContainer = document.createElement('div');
    divContainer.classList.add('divContainer');

    const parrafo = document.createElement('p');
    parrafo.textContent = value;

    const btnEliminar = document.createElement('button');
    btnEliminar.id = id;
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', function() {
        localStorage.removeItem(btnEliminar.id);  // Remove the item from localStorage
        const liRemove = document.getElementById(btnEliminar.id); 
        if (liRemove) {
            liRemove.remove();  // Remove the li element from DOM
        }
    });

    divContainer.appendChild(parrafo);
    divContainer.appendChild(btnEliminar);
    liElemnent.appendChild(divContainer);
    ulElement.appendChild(liElemnent);
    guardarLocalstore(id, copiaChiste);
}

function guardarLocalstore(id, chiste) {
    localStorage.setItem(id, JSON.stringify(chiste));  // Store the joke in localStorage
}

function cargarListaLocalStore() {
    const keys = Object.entries(localStorage);
    
    for (let key of keys) {
        const clave = key[0];
        const valor = JSON.parse(key[1]);

        if (valor.icon_url === 'https://api.chucknorris.io/img/avatar/chuck-norris.png') {
            renderizarChiste(valor);
        }
    }
}

cargarListaLocalStore();

btnEliminar.addEventListener('click', function() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key)); 
        if (value && value.icon_url) {
            localStorage.removeItem(key);
            const liRemove = document.getElementById(key);
            if (liRemove) {
                liRemove.remove();
            }
        }
    }
});
