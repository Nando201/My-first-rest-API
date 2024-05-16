const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')


//settings
app.set('port', process.env.PORT || 3000)

//middlewars
//Muestra lo que va llegando al server
app.use(morgan('dev')) //procesa datos, antes que el servidor los reciba
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.get('/', (req,res) => {
    res.send('Entraste a mi pagina')
})

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})