'use strict' 

var jwt = require('jwt-simple');


exports.decodeToken = (token) =>{

    const clv='#4qwd_313fgDog23w-8hWDaeg3VdgrH24C-lwfeDZ3C2W46S.3486wV-Dpw4eg9sF5' 
  
    let decode = ""

    try{
        decode =  jwt.decode(token,clv)
    }catch(err){
        console.log(err.message)
    }
  


     return decode;
}