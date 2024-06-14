const { Router } = require('express')
const router = Router()
const _ = require('underscore');
const movies = require('../../sample.json')
const path = require('path');

//Solicitar descripcion de la pelicula
router.get('/', (req,res) => {    
    res.json(movies)
})

//Guardar algo
router.post('/', (req,res) => {
    const { title, director, year, rating } = req.body
    if(title && director && year && rating){
        const id = movies.length + 1
        const newMovie = {...req.body, id}
        movies.push(newMovie)
        res.json(movies)
    }else{
        res.status(500).res.json({error: 'There was an error'})
    }
})

//Actualizar
router.put('/:id', (req,res) => {
    const { id } = req.params
    console.log(id)
    const { title, director, year, rating } = req.body
    if(title && director && year && rating){
        _.each(movies, (movie, i) => {
            if(movie.id == id){
                movie.title = title
                movie.director = director
                movie.year = year
                movie.rating = rating
           }
       });
       res.json(movies)
    }else{
        res.status(500).res.json({error: 'There was an error'})
    }
})


//Eliminar
router.delete('/:id', (req,res) => {
    const { id } = req.params
    console.log('ID to delete:', id);
    // Convertir id a número si es necesario
    const idNum = parseInt(id, 10);
    // Validar que el id es un número
    if (isNaN(idNum)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    _.each(movies, (movie, i) => {
        if(movie && movie.id === idNum){
            movies.splice(i,1)
        }
    });
    res.json(movies)
})

module.exports = router