'use strict'

var dayjs = require('dayjs')
var ncrypt = require("../services/ncrypt/index")

exports.authenticated = function(req, res, next){

    // Comprobar si llega la cabecera de autorizacion
    if(!req.headers.authorization){
        return res.status(403).send({});
    }
   
    // Limpiar el token y quitar comillas
    var token = req.headers.authorization.replace(/['"]+/g,'');
   
    try{
        // Decodificar token
        const ncryptData = new ncrypt();
        var payload = ncryptData._decryptData(token)
        // Comprobar la expiración del token
        if(payload.exp <=  dayjs().format()){
            return res.status(404).send({});
        }
    
    }catch(ex){
        return res.status(404).send({});
    }
    
    // Adjuntar usuario identificado a la request para poder asi acceder al usuario 
    req.user = payload;

    // Pasar a la acción
  
    next();
};


exports.authp = function(req, res, next){

    // Comprobar si llega la cabecera de autorizacion
    if(!req.headers._pk){
        return res.status(403).send({});
    }
   
    // Limpiar el token y quitar comillas
    var token = req.headers._pk.replace(/['"]+/g,'');
   
    try{
        // Decodificar token
        const ncryptData = new ncrypt();
        var payload = ncryptData._decryptPubData(token)
        // Comprobar la expiración del token
        if(payload.exp <=  dayjs().format()){
            return res.status(404).send({});
        }
    
    }catch(ex){
        return res.status(404).send({});
    }
    
  
    // Pasar a la acción
  
    next();
};