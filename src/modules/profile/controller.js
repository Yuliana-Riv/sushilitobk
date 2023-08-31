"use strict"
var profileModel =require( "./model");
var profileRepo = require("./repo");

let validService = require("../../services/validator/validateParams")

const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new profileRepo();
    const _model = new profileModel( _repo);
  

    let data = await _model.getAll();
    let status ='success'
    let message ='Perfil'
   
     if(!Array.isArray(data)){
        status='error'
        message = data
        
     }

     return res.status(200).send({
      status: status,
      message: message,
      result: data
    });



    
  },

  getById: async  (req, res) => {
    const _repo = new profileRepo();
    const _model = new profileModel( _repo);
   

    let id = parseInt(req.params.id);

    const validate = new validService()
    let validID = validate.validNum(id)
    if(!validID){
        return res.status(200).send({
            status: 'error',
            message: 'Tipo de dato no valido.',
           
          });
    }


    let data = await _model.getById(id);
   
    let status;
    let message='Perfil encontrado.'

   


    if(!data.id ){
     
      status = 'error'
      message = data
      
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: data
    });
  },


  
  create: async (req, res) => {
    
    const _repo = new profileRepo();
    const _model = new profileModel( _repo);
    let {name, code, main} = req.body
    let payload = req.user
   
  
    let status ='success';
    let message ='Perfil creada con exito.'
    let result =''

    const validate = new validService()


    let validAdm = validate.validAdm(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }



   
    let validName = validate.validParam(name)
    let validcode = validate.validParam(code)
    let validmain = validate.validParam(main)

    if(!validName || !validmain || !validcode){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    
  
         
    result = await _model.create({name, code, main});
    let added ='_'

    if(result != 'success'){
    status='error'
    message=result

    
    
    }else{
        added = await _model.last()
    }

    
    
    return res.status(200).send({
        message:message,
        status:status,
        result:result,
        added:added
    });
    

  },

 

  update: async(req, res) =>{
    const _repo = new profileRepo();
    const _model = new profileModel( _repo);

    let {id, name, code, main} = req.body
    

    let message='Perfil actualizada con exito.'
    let result =''
    let status ='success';

    const validate = new validService()

    let payload = req.user
    let validAdm = validate.validAdm(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    let validId = validate.validNum(id)

    if(!validId ){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    }

    let getById = await _model.getById(id);

    
    //validar datos
    if(getById == 'No se encontraron coincidencias.' || getById == 'error'){
      return res.status(200).send({
        status: 'error',
        message: 'Perfil no encontrada.',
        result:result
      });
    }

    let validName = validate.validParam(name)
    let validcode = validate.validParam(code)
    let validmain = validate.validParam(main)


    !validName ? name = getById.name : name 
    !validcode ? code = getById.code : code 
    !validmain ? main = getById.main : main 
   
   
   
    id = parseInt(id);

    result = await _model.update({id, name, code, main});

      if(result != 'success'){
        status='error'
        message =result
      }
      return res.status(200).send({
          message:message,
          status:status
      });
      
  },


  delete: async  (req, res) => {
    const _repo = new profileRepo();
    const _model = new profileModel( _repo);
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
    result == 'success' ? message ='Perfil eliminado' : message= result

    result != 'success' ? status = 'error' : status

    return res.status(200).send({
      message: message,
      status: status,
    });
  },


};








module.exports = controller;
