//para recordar --------------------------------------------------

//los JWT tienen 3 partes (header, payload y la firma)
//en la firma también está COMO FUE GRABADO EL JWT
//EN EL PAYLOAD NO PODEMOS GRABAR INFORMACIÓN SENSIBLE
//En el payload también viene la fecha para ver cuando expira
//Se puede poner una duración al token


//para recordar --------------------------------------------------

//jwt habíamos instalado al inicio de la sección 8
//importamos el paquete
const jwt = require('jsonwebtoken');

//creamos una función
//necesitamos el uid del usuario porque lo vamos a grabar en el payload
const generarJWT = (uid) => {
    return new Promise((resolve, reject) =>{
        const payload = {uid};
        //usamos el sign para firmarlo
        //el segúndo parámetro es un secretOrPrivateKey que lo vamos a definir en el archivo .env
        //mucho cuidado con eso porque en manos equivocadas permite a otras personas firmar sus tokens como
        //si fueran creados desde mi servidor
        jwt.sign(payload, process.env.JWT_KEY, {
            //tiempo de expiración del token
            expiresIn: '24h'
            //se disparaun error si es que hay y sino un token, si todo sale bien
        }, (err, token) => {
            if(err){
                //si tenemos un error, significa que no se pudo crear el token
                reject('No se pudo generar el JWT')
            }else{
                //TOKEN!! ÉSTE token necesito mandar al auth.js
                resolve(token);
            }
        });
    });

}


//exportamos
module.exports = {
    generarJWT
}