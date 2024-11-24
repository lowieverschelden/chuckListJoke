const btnfetchJoke = document.getElementById('fetchJoke');
const ulElement = document.getElementById('jokeList');
const elementBody =document.body; // Nos traemos el body para agregar el botón eliminar todo

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

//crear un botón para eliminar todos los elementos a la vez 
function pintarBotonLimpiarLocalstore(){
  //Creamos en el Dom un botón para eliminar todo el localstorage
  const btnEliminarTodo=document.createElement('button');
  btnEliminarTodo.classList.add('EliminarTodo');
  btnEliminarTodo.textContent = 'Eliminar todo';

 //Agregamos uel manejador al botón
  btnEliminarTodo.addEventListener('click', function() {
    
    for (let i = localStorage.length -1; i >= 0; i--) {
        const key = localStorage.key(i);
        console.log('clave: ',key)
        const value = JSON.parse(localStorage.getItem(key)); 
        if (value && value.icon_url) {
            localStorage.removeItem(key);
            console.log('vale : ',i)
            const liRemove = document.getElementById(key);
            if (liRemove) {
                liRemove.remove();
            }
        }
    }
});

  

  //añadimos el botón btnEliminarTodo en el body
  elementBody.appendChild(btnEliminarTodo)
}

cargarListaLocalStore();
pintarBotonLimpiarLocalstore(); 
