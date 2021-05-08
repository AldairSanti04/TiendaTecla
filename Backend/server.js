const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db/db');
const cors = require('cors')
const midd = require('./middleware/midd')


app.use(express.json());
app.use(cors());

//Endpoints
app.get('/', cors(midd.corsOptions), function(req, res) {
    
})

//Iniciar el Servidor
app.listen(process.env.PORT, ()=> {
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
});

app.get('/productos', cors(midd.corsOptions), async function (req, res){
    try {
        let result = await db.mandarProductos();
        res.send(result)
    } catch (error) {
        let errorMensaje = { error : error.message }
        res.status(404).send(errorMensaje)
    }
});

app.get('/buscar/:palabra', async (req, res) => {
    try {
        let result = await db.mandarBusqueda(req.params.palabra);
        res.send(result);
    } catch(error) {
        let errorMensaje = { error: error.message }
        res.status(404).send(errorMensaje);
    }
})