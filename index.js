const express = require('express');
const path = require('path');
require('dotenv').config();

//db config
require('./database/config').dbConnection();
//usuario mongoose db 
//adrian
//password: Mascego7


// App de Express
const app = express();
//para recibir la información que viene de un posteo, Express lo tiene hecho por nosotros
//vamos a configurar lo que es la lectura de la información que viene en el body de una petición http
//lectura y parseo del body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );


//Mi definición de rutas
 //middleware: no es más que una función que se ejecuta cuando el código va pasando por aquí
//lo de abajo es middleware
app.use('/api/login', require('./routes/auth'));
server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


