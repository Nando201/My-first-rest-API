const express = require('express')
const { json } = require('express/lib/response')
const morgan = require('morgan')
const path = require('path');

//Initilizations
const app = express()

//Settings
app.set('port', process.env.PORT || 1234)
app.set('json spaces', 2)

//Middlewares - esencialmente son funciones, cada solicitud pasara por estas funciones
// A app.use() tengo que pasarle middlewar functions, monta los middlewars en la app
// Con app.use() le indico que utilizo que estos middlewars para procesar las solicitudes (montar middlewars)
app.use(morgan('dev')) //Registrador de solicitudes HTTP
app.use(express.json()) 
app.use(express.urlencoded({extended:false}))


//Routes - para recibir y mostrar datos, cada solicitud sea procesado o llegue al router adecuado
//Compara la ruta de la solicitud con las rutas definidas en los routers disponibles, una vez que lo encuentra, se lo pasa para que lo procese
app.use((req,res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type')
    next()
})

app.use('/admin/movies', require('./routes/movies')) //app(ruta, middleware), estoy asociando la ruta con el middleware

//Formas de servir imagenes con sendFile y con static
//app.use('/admin/img', require('./routes/serveImages')) 
app.use('/static', express.static(path.join(__dirname, '..', 'static')));

//Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

