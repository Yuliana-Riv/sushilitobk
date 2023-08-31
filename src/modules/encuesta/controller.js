"use strict"
var encuestaModel =require( "./model");
var encuestaRepo = require("./repo");

let validService = require("../../services/validator/validateParams")


const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new encuestaRepo();
    const _model = new encuestaModel( _repo);
 


    let payload = req.user
    const validate = new validService()
    let validAdm = validate.validAdmCol(payload.role)

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
    let items = await _model.getAll();
    let status ='success'
    let message ='success'

   
     if(!Array.isArray(items)){
  
            status ='error'
        message = items;
      }

    return res.status(200).send({
        status:status,
        message: message,
        result: items,
       
    });
    
  },

  getById: async  (req, res) => {
    const _repo = new encuestaRepo();
    const _model = new encuestaModel( _repo);



 
    let result=[];
    let status;
    let message='encuesta encontrado.'

    let payload = req.user
    const validate = new validService()
    let validAdm = validate.validAdmCol(payload.role)

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


    const id = req.params.id;
    let validid = validate.validNum(id)
    if(!validid){
        return res.status(200).send({
          status: 'error',
          message: 'Tipo de dato no valido.',
        
        });
      }
  


    let item = await _model.getById(id);
   


    if(item.id){
      status = 'success'
      result = item
    }else{
      status = 'error'
      message = item
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: result
    });
  },

 



  create: async (req, res) => {
    
    const _repo = new encuestaRepo();
    const _model = new encuestaModel( _repo);
    let {num_ticket,
        p1 , 
        p2 , 
        p3, 
        p4 , 
        p5, 
        p6 , 
        p7  , 
        p8, 
        p9 , 
        p10, 
        p11} = req.body
    let payload = req.user

    
  
    let status ='success';
    let message ='encuesta creado con exito.'
    let result =''

    const validate = new validService()


 


   
    let validnum = validate.validParam(num_ticket)
    let validp1 = validate.validParam(p1)
    let validp2 = validate.validParam(p2)
    let validp3 = validate.validParam(p3)
    let validp4 = validate.validParam(p4)
    let validp5 = validate.validParam(p5)
    let validp6 = validate.validParam(p6)
    let validp7 = validate.validParam(p7)
    let validp8 = validate.validParam(p8)
    let validp9 = validate.validParam(p9)
    let validp10 = validate.validParam(p10)
    let validp11 = validate.validParam(p11)


    if(!validnum || !validp1 || !validp2 || !validp3 || !validp4 || !validp5 || !validp6 || !validp7 || !validp8 || !validp9  ){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }
    if(!validp10){
        p10=''
    }
    if(!validp11){
        p11=''
    }

  

    

    result = await _model.create({num_ticket,
        p1 , 
        p2 , 
        p3, 
        p4 , 
        p5, 
        p6 , 
        p7  , 
        p8, 
        p9 , 
        p10, 
        p11});

   if(result != 'success'){
     status='error'
     message=result
   }

   return res.status(200).send({
       message:message,
       status:status,
       result:result,
   });
  

  },


  delete: async (req, res) => {
    const itemRepo = new phoneRepo();
    const modelItem = new phoneModel(itemRepo);
    let params = req.body;

    let id = params.id;

    if (isNaN(id) || id == undefined || id == "" || id == null) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    //let phone = await modelItem.getById(id);

    id = parseInt(params.id);

    let result = await modelItem.delete(id);

    let status = "success";
    result != "success" ? (status = "error") : status;
 

    return res.status(200).send({
      message: result,
      status: status,
    });
  },


};


module.exports = controller;