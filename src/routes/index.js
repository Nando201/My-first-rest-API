const { Router } =  require('express')

//Un router o enrutador, permite definir rutas de manera modular, organizando el codigo en multiples archivos
const router = Router() //se usa para definir rutas especificas y sus manejadores

router.get('/test', (req,res) => {
    const data = {
        "name": "Fernando",
        "lastName" : "Chanduvi"
    }
    //res.send('Entraste a mi pagina')
    res.json(data) //Esta respondiendo con JSON
})

//Exportar la instancia router, para que pueda ser utilizada en otros archivos
module.exports = router