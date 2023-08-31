"use strict"
var userModel =require( "./model");
var usersRepo = require("./repo");
var colaboradorModel =require( "../colaborador/model");
var colaboradorRepo = require("../colaborador/repo");

var ncrypt = require("../../services/ncrypt/index")

var bcrypt = require('bcrypt');

var dayjs = require('dayjs')



let validService = require("../../services/validator/validateParams")

var SendEmail = require('../../services/nodemailer/sendEmail')





const controller = {
 

  valSession: async (req,res) =>{
    const _repo = new usersRepo();
    const _model = new userModel( _repo);

    let payload = req.user
    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    const validate = new validService()

    let validAdm = validate.validRole(payload.role);

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }
 
    
    let {id, id_user, type, code} = req.body
    
    let validid = validate.validNum(id)
    let validid_user = validate.validNum(id_user)
    let validtype = validate.validRole(type)
    let validcode = validate.validParam(code)


    if(!validid || !validid_user || !validtype || !validcode ){
      return res.status(200).send({
        status:'error',
        message:'Datos no validos.',
        result:'',
      });
    }

    let result = await _model.getSession(id)

 
    if(result =='error'){
      return res.status(200).send({
        status:'error',
        message:'Session no valida.',
        result:'',
      });
    }
    id_user = parseInt(id_user)

    if(result.id_user == id_user && result.type == type && result.code ==code ){
      return res.status(200).send({
        status:'success',
        message:'Session validada',
        result:result,
      });
    }else{
      return res.status(200).send({
        status:'error',
        message:'Session no validada',
        result:'',
      });
    }


   

  },

  getData: async(req, res) =>{  
    let status ='success';
    let message ='usuario valido';
    let result = "";

    let data = req.body.data;

    if(data == null || data == undefined || data ==''){

      return res.status(200).send({
        status:'error',
        message:'Datos no validos.',
        result:result,
      });
    }

    try{
      const ncryptData = new ncrypt();

      result = ncryptData._decryptData(data)

      if(result.exp == undefined || result.exp =='' || result.exp == null){ // verificamos que exista el parametro exp.
        return res.status(200).send({
          status:'error',
          message:'Token no valido.',
          result:'',
        });
      }

      if(result.exp <=  dayjs().format()){ // validamos la expiración del token.
         status='error'
         message='Token expirado.'
         result=''
      }

    }catch(err){  // puede que el token no sea valido (este creado con otra llave) capturamos el error.
      status ='error'
      message= err.message
    }

    return res.status(200).send({
      status:status,
      message:message,
      result:result,
     
    });
  },

  login: async (req, res) => {
    const _repo = new usersRepo();
    const _model = new userModel( _repo);
    const _repoc = new colaboradorRepo();
    const _modelc = new colaboradorModel( _repoc);
   

    let result ='';

    //recoger parametros
    const {email, password} = req.body;
 
    const validate = new validService()
    
    //validar datos
    var validEmail= validate.validEmail(email)
    var validPass = validate.validPass(password)

    if (!validPass || !validEmail) {
      return res.status(200).send({
        status:'error',
        message: "Credenciales incorrectas.",
        result:''
      });
    }


    




    let user = await _model.getByEmail(email);
    
    if (user.email) {
     
      let userPass = String(user.pass);
      let paramsPass = String(password);

      //comparar passwords
      bcrypt.compare( paramsPass, userPass, async function(err, result) {
        // result == true
        if(err) {
          console.error(err)
          return res.status(200).send({
            status: "error",
            message: "Credenciales incorrectas..",
            result:''
          });
        }

        if(!result){
          return res.status(200).send({
            status: "error",
            message: "Credenciales incorrectas.",
            result:''
          });
        }

        //generar el codigo de auth
        var ctrs = "abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRTUVWXYZ123456789";
        var code = "";
        for (var k = 0; k < 6; k++) {
          code += ctrs.charAt(Math.floor(Math.random() * ctrs.length));
        }
        code ='legrafica23'

      

        //Enviar email con el codigo de auth
         if(user.role =='Admin' || user.role =='admin' || user.role =='legrafica' || user.role =='Legrafica' || user.role =='colaborador'){
          const sendEmail = new SendEmail({user:user, code: code});

          sendEmail.code; 
          console.log('correo enviado')
        }

       
        let session = await _model.createSession(user.id, code, user.role)
        if(!session?.insertId){
          return res.status(200).send({
            status: "error",
            message: "Login no valido.",
            result:result
          });
        }

       
        delete  user.pass //
        const ncryptData = new ncrypt();
        const token = ncryptData._createToken(user, session.insertId)

      

        return res.status(200).send({
          status: "success",
          message:'Login valido',
          result: token,
         // user
        });

      });


    }else{
      let colaborador = await _modelc.getByEmail(email);
      console.log(colaborador)
    
    if (colaborador.email) {
     
      let colaboradorPass = String(colaborador.pass);
      let paramsPass = String(password);

    

      //comparar passwords
      bcrypt.compare( paramsPass, colaboradorPass, async function(err, result) {
        // result == true
      
        if(err) {
          console.error(err)
          return res.status(200).send({
            status: "error",
            message: "Credenciales incorrectas..",
            result:''
          });
        }
      

        if(!result){
          return res.status(200).send({
            status: "error",
            message: "Credenciales incorrectas.",
            result:''
          });
        }

        //generar el codigo de auth
        var ctrs = "abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRTUVWXYZ123456789";
        var code = "";
        for (var k = 0; k < 6; k++) {
          code += ctrs.charAt(Math.floor(Math.random() * ctrs.length));
        }
        code ='legrafica23'

      

        //Enviar email con el codigo de auth
        /* if( colaborador.role =='colaborador'){
          const sendEmail = new SendEmail({user:colaborador, code: code});

          sendEmail.code; 
          console.log('correo enviado')
        }*/

       
        let session = await _model.createSession(colaborador.id, code, colaborador.role)
        if(!session?.insertId){
          return res.status(200).send({
            status: "error",
            message: "Login no valido.",
            result:result
          });
        }

       
        delete  colaborador.pass //
        const ncryptData = new ncrypt();
        const token = ncryptData._createToken(colaborador, session.insertId)

      

        return res.status(200).send({
          status: "success",
          message:'Login valido',
          result: token,
          //colaborador
        });

      });


    }else{
      return res.status(200).send({
        status: "error",
        message: "Credenciales incorrectas..",
        result:''
      });
    }
    }


   
    



 
      
     
    


  },

  reenviarCodigo: async(req,res) =>{
    const _repo = new usersRepo();
    const _model = new userModel( _repo);


      let {email, name, code} = req.body

      if(!email || !name || !code){
        return res.status(200).send({
          status: "error",
          message: "Sesión no valida, vuelva a iniciar sesión.",
         
        });
      }

      let user ={
        email:email,
        name:name
      }

      let result = await _model.getSession(code)
      
      if(result =='error'){
        return res.status(200).send({
          status: "error",
          message: "Sesión no valida, vuelva a iniciar sesión.",
         
        });
      }
      if(!result.code){
        return res.status(200).send({
          status: "error",
          message: "Sesión no valida, vuelva a iniciar sesión.",
         
        });
      }

    


      const sendEmail = new SendEmail({user:user, code: result.code});

      if(email==undefined || email==null || email==''){
        return res.status(200).send({
          status: "error",
          message: "1.Faltan datos.",
         
        });
      }

      if(name==undefined || name==null || name==''){
        return res.status(200).send({
          status: "error",
          message: "2.Faltan datos.",
         
        });
      }

      if(code==undefined || code==null || code==''){
        return res.status(200).send({
          status: "error",
          message: "3.Faltan datos.",
         
        });
      }

      sendEmail.code; 
      console.log('correo enviado')

      return res.status(200).send({
        status: "success",
        message:'Login valido',
        result: {email:email, nombre:name},
      });
  },

  createAuth: async(req,res ) =>{
    const ncryptData = new ncrypt();
    let result =  ncryptData._createAuth()

    return res.status(200).send({
      status: "success",
      message:'Auth valido',
      result:  result
    });
  },

  getAuth: async(req,res ) =>{

    let token  = req.body.token
    if(token==undefined || token==null || token==''){
      return res.status(200).send({
        status: "error",
        message: "Datos no validos.",
        result: null,
       
      });
    }

    
    const ncryptData = new ncrypt();

    let result = ncryptData._decryptData(token)
    return res.status(200).send({
      status: "success",
      message:'Auth valido',
      result:  result
    });

  },





};








module.exports = controller;
