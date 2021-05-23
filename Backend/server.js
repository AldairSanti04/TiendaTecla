const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const midd = require('./middleware/midd');
const sequelize = require('./db/db');
const MLRoutes = require('./routes/ML.routes');
const pLocales = require('./routes/productosLocales.routes');
const vistaProdcutos = require('./MVC/views/view.productos');
const Productos = require('./db/productos.db')

app.use(express.json());
app.use(cors());
app.use(midd.limiter);

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

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
        await Productos.sync({alter:true});
        //await Productos.create({nombre_producto: 'Pantalon', precio_producto: 220.85, imagen_producto: 'https://www.garufajeans.com.mx/3693-home_default/pantalon-jeans-furor-maverick-corte-vaquero.jpg', cantidad_inventario: 10})
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
vistaProdcutos(app)