const mongoose = require('mongoose');
//creo una función encargada de hacer la conexión a la base de datos
const dbConnection = async () => {
    try {
        //conexion a la bd
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('DB Online');
    } catch (error) {
        //si sucede un error lo imprimimos en consola
        console.log(error);
        throw new Error('Error en la base de datos - hable con el admin');
        
    }
}

module.exports = {
    dbConnection
}