/*
    path: api/login
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//creamos un usuario
//en el segundo argumento validamos que se manden todos los datos que necesitamos
//validamos usando varios middlewares
router.post('/new',[
    //estas llaves cuadradas son un arreglo en javascript
    //aquí vamos a colocar todos los middlewares que necesito
    //el check es un middleware que permite verificar campo por campo
    //en éste caso me quiero asegurar que tiene que venir 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    //isEmail ya valida que el correo no esté vacío
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,crearUsuario);
//crearUsuario sólo se dispara si pasa todos los next de los middlewares de VALIDAR CAMPOS

router.post('/',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,login);

router.get('/renew', validarJWT, renewToken);

module.exports = router;