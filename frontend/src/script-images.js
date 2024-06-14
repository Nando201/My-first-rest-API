async function iniciarWeb(){
    let response = await fetch('http://localhost:1234/admin/img')
    let movies = await response.json()
    nuevaPelicula(movies)
    solicitarImagenes()
}


window.addEventListener("load", iniciarWeb);