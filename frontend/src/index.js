const contenedorMovies = document.getElementById('contenedorMovies')
const deleteButton = document.getElementById('deleteButton')
const updateButton = document.getElementById('updateButton')
const form = document.getElementById('form')
form.style.display = 'none'
updateButton.addEventListener('click', habilitarForm)
deleteButton.addEventListener('click', eliminarPelicula)
form.addEventListener('submit', updateMovie)

let arrayMovies = []
let inputPeliculas = []
let idMovieToUpdate
let seleccionInput = false

async function iniciarWeb(){
    try{
        let response = await fetch('http://localhost:1234/admin/movies')
        let movies = await response.json()
        nuevaPelicula(movies)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
    }catch(err){
        console.error(err)
    }
}


function nuevaPelicula(movies){
    movies.forEach((movie) => {
        arrayMovies.push(new Movie(movie.id,movie.title,movie.director,movie.year,movie.rating))
    })
    recorrerPeliculas(arrayMovies)
}   

function recorrerPeliculas(coleccionPelis){
    coleccionPelis.forEach((movie) => {

        //Contenedor individual de peliculas
        let inputId = movie.id
        let inputName = 'pelicula'

        let inputMovie = document.createElement('input')
        inputMovie.setAttribute('id', inputId);
        inputMovie.setAttribute('name', inputName)
        inputMovie.setAttribute('type', 'radio')
        inputMovie.className = 'input-movie'

        let movieCard = document.createElement('label')
        movieCard.className = 'movie-card';
        movieCard.setAttribute('for', inputId);
        movieCard.setAttribute('data-id', inputId);

        //Contenedor de imagen
        let imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        //Titulo
        let title = document.createElement('h3');
        title.textContent = movie.title;
        title.setAttribute('id', `movie-title-${movie.id}`)

        //Descripcion de la pelicula
        let descriptionList = document.createElement('ul');
        descriptionList.innerHTML = `
            <li <strong> Director: </strong> <span id="movie-director-${movie.id}"> ${movie.director} </span></li>
            <li <strong> Year: </strong> <span id="movie-year-${movie.id}"> ${movie.year} </span></li>
            <li <strong> Rating: </strong> <span id="movie-rating-${movie.id}"> ${movie.rating} </span></li>
        `;

        movieCard.appendChild(imageContainer);
        movieCard.appendChild(title);
        movieCard.appendChild(descriptionList);
        contenedorMovies.appendChild(inputMovie)
        contenedorMovies.appendChild(movieCard)

        movie.mostrarImagen(imageContainer)
    })
}

function validarInput(){
    let idMovie = null
    inputPeliculas = document.querySelectorAll('.input-movie')

    for(let i = 0; i < inputPeliculas.length; i++){
        if(inputPeliculas[i].checked){
            idMovie = inputPeliculas[i].id
            seleccionInput = true
            return idMovie
        }
    }

    if(idMovie === null) { // Si idMovie sigue siendo null, significa que no se ha seleccionado nada
        alert('Selecciona una pelicula'); // Muestra un mensaje de alerta
    }

}

async function eliminarPelicula(){
    try{
        let id = parseInt(validarInput())
        if(seleccionInput){
            let response = await fetch('http://localhost:1234/admin/movies/' + id, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            eliminarElementos(id)
            console.log(arrayMovies)
        }
    }catch(err){
        console.error(err)
    }
}

function habilitarForm(){
    idMovieToUpdate = parseInt(validarInput())
    if(seleccionInput){
        form.style.display = 'flex'
    }
}


function eliminarElementos(id){

    let movieCard = document.querySelector(`label[data-id="${id}"]`)
    let inputMovie = document.getElementById(id)
    
    if (movieCard) {
        contenedorMovies.removeChild(movieCard);
    }
    if (inputMovie) {
        contenedorMovies.removeChild(inputMovie);
    }
    arrayMovies = arrayMovies.filter(movie => movie.id !== id);
    
}

function actualizarElementos(data){

   document.getElementById(`movie-title-${data.id}`).textContent = data.title
   document.getElementById(`movie-director-${data.id}`).textContent = data.director
   document.getElementById(`movie-year-${data.id}`).textContent = data.year
   document.getElementById(`movie-rating-${data.id}`).textContent = data.rating

}

async function updateMovie(e){
    e.preventDefault()
    /* let data = {
        "id": 0,
        "title": "Alinigenas",
        "director" : "James Cameron",
        "year" : "1986",
        "rating" : "8.5"
    }*/
    const formData = new FormData(form)
    //const data = Object.fromEntries(formData.entries());
    const urlEncodedData = new URLSearchParams(formData).toString();
    console.log(urlEncodedData)
    console.log(idMovieToUpdate)
    let dataResponse
    try{
        let response = await fetch(`http://localhost:1234/admin/movies/${idMovieToUpdate}`, {
        method: "PUT", // or 'PUT'
        mode: 'cors',
        headers: {
            //"Content-Type": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlEncodedData, //JSON.stringify(data)
        })
        if(!response.ok){
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        dataResponse = await response.json()
        console.log(dataResponse[idMovieToUpdate])
        actualizarElementos(dataResponse[idMovieToUpdate])
        form.style.display = 'none'
    } catch(err){
        console.error(err)
    }
}
    


window.addEventListener("load", iniciarWeb);