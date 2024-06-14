class Movie{
    constructor(id, title,director, year, rating){
        this.id = id
        this.title = title
        this.director = director
        this.year = year
        this.rating = rating
    }
    async mostrarImagen(imageContainer){
        try{
            let response = await fetch(`http://localhost:1234/static/${this.id}.jpg`)
            //let response = await fetch(`http://localhost:1234/admin/img/${this.id}.jpg`)
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            let blob = await response.blob()
            let imageUrl = URL.createObjectURL(blob)

            // Crear un elemento de imagen
            let img = document.createElement('img')
            img.src = imageUrl
            img.width = 120
            img.height = 150
            img.alt = `Imagen de ${this.title}`
            
            // Insertar la imagen en el DOM (por ejemplo, en un div con id "imageContainer")
            imageContainer.innerHTML = ''
            imageContainer.appendChild(img)
        }catch (error) {
            console.error('Error al mostrar la imagen:', error);
        }
}}
