const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    //definimos cada uno de los campos que va a tener un usuario
    //definimos las propiedades de nombre, string required etc
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true //para que no se repita el correo
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        //no es obligatorio pero el valor por defecto va a ser false
        default: false
    }
    //creamos adicionalmente la propiedad online para guardar si la persona está conectada o no 
});

//vamos a hacer un cambio y sobreescribir un método para el password
UsuarioSchema.method('toJSON', function(){
    //extraemos de esa estructuracion el this.toObject que es la instancia del objeto que está
    //creado en éste momento, que es el que tiene toda la información del usuario 
    //abajo extraemos todo menos __v (version), _id y password. (...object) extraemos el resto de la información
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
    //probamos en postman y vemos que me trae toda la información menos __v _id y password
});

//exportamos
module.exports = model('Usuario', UsuarioSchema);