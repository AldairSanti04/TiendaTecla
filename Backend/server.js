const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const midd = require('./middleware/midd');
const sequelize = require('./db/db');
const MLRoutes = require('./routes/ML.routes');
const pLocales = require('./routes/productosLocales.routes');

app.use(express.json());
app.use(cors());
app.use(midd.limiter);

//middleware para captura de errores globales.
app.use((err, req, res, next)=> {
    console.log(err);
    if (!err){
        return next();
    }

    return res.status(500).json('Se produjo un error inesperado, intente nuevamente')
});

//Iniciar el Servidor
async function inicioServidor() {
    try {
        //console.log(process.env.DB_USER)
        await sequelize.authenticate();
        console.log('Conexion con la DB correcta!')
        app.listen(process.env.PORT, function (){
            console.log(`Sistema iniciado en el puerto ${process.env.PORT}`)
        })
    }catch (err){
        console.log(err)
        console.log('No se pudo conectar con la DB')
    }
}

inicioServidor();

//Endpoints
app.get('/', cors(midd.corsOptions), (req, res) => {
    res.send('Inicio de nuestra API');
})

MLRoutes(app);
pLocales(app);
