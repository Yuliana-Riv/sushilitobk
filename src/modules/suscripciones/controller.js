"use strict"
var suscripcionesModel = require( "./model");
var suscripcionesRepo = require("./repo");

let validService = require("../../services/validator/validateParams")
let nodemailer = require('../../services/nodemailer/subscribe')

const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new suscripcionesRepo();
    const _model = new suscripcionesModel( _repo);
  

    let suscripciones = await _model.getAll();
    let status ='success'
    let message ='suscripciones'
   
   

   
     if(suscripciones == 'No se encontraron coincidencias.' || suscripciones == 'error' ){
        status='error'
        message = suscripciones
        
     }

     return res.status(200).send({
      status: status,
      message: message,
      result: suscripciones
    });



    
  },

  getById: async  (req, res) => {
    const _repo = new suscripcionesRepo();
    const _model = new suscripcionesModel( _repo);
   

    let id = parseInt(req.params.id);

    const validate = new validService()
    let validID = validate.validNum(id)
    if(!validID){
        return res.status(200).send({
            status: 'error',
            message: 'Tipo de dato no valido.',
           
          });
    }


    let suscripciones = await _model.getById(id);
   
    let status;
    let message='suscripciones encontrado.'

   


    if(suscripciones == 'No se encontraron coincidencias.' || suscripciones == 'error' ){
     
      status = 'error'
      message = suscripciones
      
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: suscripciones
    });
  },

  search: async  (req, res) => {
    const _repo = new suscripcionesRepo();
    const _model = new suscripcionesModel( _repo);
   
    let search = req.params.search;
    let suscripciones = await _model.search(search);
    
   
    
   


  
    let status= 'success';
    let message='Se han encontrado coincidencias.'

    if(suscripciones == 'No se encontraron coincidencias.' || suscripciones == 'error' ){
      status = 'error'
      message = suscripciones
    }

   
     
    return res.status(200).send({
      status: status,
      message:message,
      result: suscripciones,
      
    });
  },

  
  create: async (req, res) => {
    
    const _repo = new suscripcionesRepo();
    const _model = new suscripcionesModel( _repo);
    let {email, sub_date} = req.body
    let payload = req.user
   
  
    let status ='success';
    let message ='suscripciones creada con exito.'
    let result =''

    const validate = new validService()

   
    let validemail = validate.validEmail(email)
    let validsub_date = validate.validParam(sub_date)
    if(!validemail || !validsub_date){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    
   
         
    result = await _model.create(email, sub_date);
    let added ='_'

    if(result != 'success'){
    status='error'
    message=result

    
    
    }else{
        added = await _model.last()

        //!ENVIAR CORREO DE SUSCRIPCIÓN
        let sendEmail = new nodemailer(email)
        sendEmail.subscripcion
    }

    
    
    return res.status(200).send({
        message:message,
        status:status,
        result:result,
        added:added
    });
    

  },


  delete: async  (req, res) => {
    const _repo = new suscripcionesRepo();
    const _model = new suscripcionesModel( _repo);
    let params = req.body;

    let payload = req.user
    const validate = new validService()
    let validAdm = validate.validAdm(payload.role)

    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
      
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
       
      });
    }
   
   

    let id = parseInt(params.id);
    if(id==undefined || isNaN(id)){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
       
      });
    }


    let result = await _model.delete(id);
    let message;
    let status ='success';
    result == 'success' ? message ='suscripción eliminada' : message= result

    result != 'success' ? status = 'error' : status

    return res.status(200).send({
      message: message,
      status: status,
    });
  },









 


};








module.exports = controller;
