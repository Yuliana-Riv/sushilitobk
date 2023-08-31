"use strict"
var  nodemailer = require('../../services/nodemailer/sendEmail') 
var ncrypt = require("../../services/ncrypt/index")


const controller = {


  test: async  (req, res) => {
    let codigo ='';

    //generar el codigo de auth
    var ctrs = "abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRTUVWXYZ1234567890";


    var code = "";
    for (var k = 0; k < 3; k++) {
      code += ctrs.charAt(Math.floor(Math.random() * ctrs.length));
    }

    code+='_'

    for (var k = 0; k < 3; k++) {
      code += ctrs.charAt(Math.floor(Math.random() * ctrs.length));
    }
    /*

    code+='/'

    for (var k = 0; k < 3; k++) {
      code += ctrs.charAt(Math.floor(Math.random() * ctrs.length));
    }

    code+='-'

    for (var k = 0; k < 3; k++) {
      code += ctrs.charAt(Math.floor(Math.random() * ctrs.length));
    } */


     codigo = code;

  

     let data ={
       username :'erik'
     }
     
     const email = new nodemailer(data)
      email.sendMessage


    return res.status(200).send({
  
      message: 'Generar Código.',
      status: 'success',
      result:codigo
    });
  },

  token: async(req, res)=>{
   
    const ncryptData = new ncrypt();

    const token = ncryptData._createPubToken()
    const decode = ncryptData._decryptPubData(token)


  

    
    return res.status(200).send({
       err:{ message:''},
       data: {token, decode}
    });
  }


};

module.exports = controller;
