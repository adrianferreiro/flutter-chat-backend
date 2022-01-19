//LEER ---------------------------------------------------------------------------

//Todo eso gracias a que estamos pasando nuestra ruta (auth.js[routes]) por el validarJWT, 
//el cual le establece (si todo sale bien) en la request el uid (req.uid = uid) [validar-jwt.js]
//y por consecuencia en auth.js (controller) en el req de la función tenemos toda la información, 
//como fue procesada por el middleware

//LEER ---------------------------------------------------------------------------



const jwt = require('jsonwebtoken');
//creamos el middleware
const validarJWT = (req, res, next) => {
    //leer el token
    const token = req.header('x-token');
    //validar token
    //si no hay ningún token entonces return para no continuar
    if(!token){
        return res.status(401).json ({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    //bien, anteriormente validamos que el token no venga vacío
    //ahora tengo que verificar si el token existe
    try {
        //validamos el token
        //para validar vamos a extraer el uid que viene en el payload del token, voy a intentar
        //extraer eso, y si revienta, significa que no funcionó
        //acordate de poner la flecha sobre las palabras para ver los parámetros que piden
        //en éste caso el primero pide el token y despues el código de seguridad que creamos en .env
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        //SI REVIENTA SE DISPARA EL CATCH
        //SI todo sale bien
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
        
    }
}

module.exports = {
    validarJWT
}