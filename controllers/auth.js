const { response } = require("express");
//importamos bcrypt para encriptar la contraseña
const bcrypt = require('bcryptjs');
//importamos el modelo
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

    //vamos a extraer el email del body
    const {email, password} = req.body;

    //vamos a confirmar si existe en la bd
    try {

        //verificamos si existe el email
        const existeEmail = await Usuario.findOne({email});
        
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        
        //extraemos la información que viene en el body
        //req.body tiene toda la información del cuerpo: nombre, email, password
        const usuario = new Usuario(req.body); //con esto creamos una nueva instancia de mi modelo
        
        //encriptamos la contraseña antes de grabar
        //salt es utilizado para generar números de manera aleatoria entonces aunque dos
        //usuarios tengan la misma contraseña el salt que se genera es diferente
        const salt = bcrypt.genSaltSync();
        //hacemos el hash en la contraseña
        usuario.password = bcrypt.hashSync(password, salt);
        
        //guardamos en la base de dato mongoose
        //esto es una tarea asíncrona así que usamos el await
        await usuario.save();

        //creo un archivo independiente para generar mi JWT Json web token
        //llamo a la función y le paso el uid
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            //objeto que quiero retornar
            //msg: 'Crear usuario!!!'
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });   
    }    
}


const login = async (req, res = response) => {
    
    const {email, password} = req.body;

    try {
        //verificamos el email
        const usuarioDB = await Usuario.findOne({email});
        //si no existe el correo 
        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }    
        //validar password
        //comparamos el password que está enviando el usuario con el que tenemos en el usuarioDB
        //utilizamos el bcrypt porque se encuentra encriptada la contraseña en la bd
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        //si no coincide el password
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }

        //si pasa esas dos validaciones anteriores quiere decir que tenemos que generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
    
}


const renewToken = async (req, res = response) => {
    
    //recuperar el uid
    const uid = req.uid;
    //generar nuevo JWT
    const token = await generarJWT(uid);
    //obtener el usuario por el uid
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token
    });



    
}

module.exports= {
    crearUsuario,
    login,
    renewToken
}