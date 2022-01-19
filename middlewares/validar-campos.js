//next es un callback que le va a indicar a express que si todo sale bien continúe con el siguiente middleware

const { validationResult } = require('express-validator');

//el "check" llama al next 
const validarCampos = (req, res, next) => {
    //validarCampos va a revisar los errores 
    const errores = validationResult(req);
    //si no está vacío, entonces hay un error, un campo que hace falta
    if(!errores.isEmpty()){
        //si hay errores
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()

        });
    }
    //llamamos el next para indicar que necesito moverme al siguiente middleware o el controlador de la ruta
    next();
}

module.exports = {
    validarCampos
}