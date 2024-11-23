const btnfetchJoke = document.getElementById('fetchJoke');
const ulElement = document.getElementById('jokeList');

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

btnfetchJoke.addEventListener('click',function() {
    obtenerChiste();
})

function renderizarChiste(chiste){

    const {id,value,icon_url}=chiste;
    const copiaChiste ={...chiste}

    const liElemnent=document.createElement('li');
    //liElemnent.classList.add('liElemnent')
    liElemnent.id=id;

    const divContainer=document.createElement('div');
    divContainer.classList.add('divContainer');

    const parrafo=document.createElement('p');
    parrafo.textContent=value;

    const btnEliminar=document.createElement('button');
    btnEliminar.id=id;
    btnEliminar.textContent='Eliminar';
    btnEliminar.addEventListener('click',function(){
        localStorage.removeItem(btnEliminar.id);
        const liRemove =document.getElementById(btnEliminar.id); 
        if (liRemove){
            liRemove.remove();
        }
    })

    divContainer.appendChild(parrafo)
    divContainer.appendChild(btnEliminar)
    liElemnent.appendChild(divContainer)
    ulElement.appendChild(liElemnent)
    guardarLocalstore(id,copiaChiste)
}

function guardarLocalstore(id, chiste) {
    localStorage.setItem(id,JSON.stringify(chiste));
}

function cargarListaLocalStore() {
    const keys = Object.entries(localStorage)
    
    for (let key of keys) {
        const clave=key[0];
        const valor=JSON.parse(key[1]);
    
        if (valor.icon_url==='https://api.chucknorris.io/img/avatar/chuck-norris.png'){
            renderizarChiste(valor);
        }
     
    }
}

cargarListaLocalStore();

//localStorage.clear();

