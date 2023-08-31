'use strict'

var CryptoJS = require("crypto-js");

const _key = "#3443g434frjg_($%3g-fF1fW46S43g43g.346&h554hF-Dp67Mf223";
const _keysec = "_h565466*l2f3&/7$%ow3tghg23tadaH";
const _keypub = "%h56546346&h554hF-Dp67Mf223tadaH";
var dayjs = require('dayjs')

class main {

  _createToken(user,code){
    let result =''
    try{
        const data ={
            sub: user.id,
            name: user.name,
            lastname: user.lastname,
            fullname: user.name + ' ' + user.lastname,
            email: user.email,
            role: user.role,
            image:user.image,
            code: code,
            iat: dayjs().format(), //fecha en la que se ha creado el token
            exp: dayjs().add(30, 'days').format()// fecha de expiracion del token, en este caso expira en 30 dias.
        };

        const str = JSON.stringify(data)
        result  = CryptoJS.AES.encrypt(str, _key).toString();

    }catch(err){
         console.log(err.message  + '[1]')
        
    }

    return result
  }

  _createPubToken(){
    let result =''
    try{
        const data ={
            iat: dayjs().format(), //fecha en la que se ha creado el token
            //exp: dayjs().add(2, 'minute').format()// fecha de expiracion del token, en este caso expira en 30 dias.
            exp: dayjs().add(1, 'month').format()// fecha de expiracion del token, en este caso expira en 30 dias.
        };

        const str = JSON.stringify(data)
        result  = CryptoJS.AES.encrypt(str, _keypub).toString();

    }catch(err){
         console.log(err.message  + '[8]')
        
    }

    return result
  }
  _createAuth(){
    let result =''
    try{
        const data ={
          auth: 'valido',
          iat:  dayjs().format(), 
          exp: dayjs().add(30, 'days').format()  
      };

        const str = JSON.stringify(data)
        result  = CryptoJS.AES.encrypt(str, _key).toString();

    }catch(err){
         console.log(err.message  + '[2]')
        
    }

    return result
  }
  _encryptData(data){
    let result =''
    try{

        const str = JSON.stringify(data)
        result  = CryptoJS.AES.encrypt(str, _key).toString();

    }catch(err){
         console.log(err.message  + '[3]')
        
    }

    return result
  }

  _encryptPubData(data){
    let result =''
    try{

        const str = JSON.stringify(data)
        result  = CryptoJS.AES.encrypt(str, _keypub).toString();

    }catch(err){
         console.log(err.message  + '[3]')
        
    }

    return result
  }
  
  _decryptData(data){

    let result =''
    try{
       var bytes  = CryptoJS.AES.decrypt(data, _key);
       result = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) 

    }catch(err){
         console.log(err.message  + '[4]')
         
    }

    return result
  }
  _decryptPubData(data){

    let result =''
    try{
       var bytes  = CryptoJS.AES.decrypt(data, _keypub);
       result = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) 

    }catch(err){
         console.log(err.message  + '[7]')
         
    }

    return result
  }

  _encryptParam(data){
    let result =''
    try{

        const str = JSON.stringify(data)
        result  = CryptoJS.AES.encrypt(str, _keysec).toString();

    }catch(err){
         console.log(err.message  + '[5]')
        
    }

    return result
  }

  _decryptParam(data){

    let result = ''
    try{
        var bytes  = CryptoJS.AES.decrypt(data, _keysec);
        result = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) 
        
    }catch(err){
         console.log(err.message  + '[6]')
        
    }

    return result
  }
  
}
  module.exports = main; 


