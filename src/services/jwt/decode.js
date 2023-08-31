'use strict' 

var jwt = require('jwt-simple');

exports.decode = (value) =>{

    const clv='wd-#2j5d1d_dd' 
  
    let decode = ""

    try{
        decode =  jwt.decode(value,clv)
    }catch(err){
        console.log(err.message)
    }

    
     return decode;
}