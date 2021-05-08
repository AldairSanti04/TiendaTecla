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
    let result = await db.mandarProductos();
    db.Respuesta = {
        codigo: 200,
        error: false,
        message: result
    }
    res.send(db.Respuesta)
});