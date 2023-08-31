'use strict' 

var jwt = require('jwt-simple');
var dayjs = require('dayjs')

exports.createAuth = () =>{

    const clv='wd-#2j5d1d_dd' 

    var payload ={
        auth: 'valido',
        iat:  dayjs().format(), 
        exp: dayjs().add(30, 'days').format()  
    };
    let token = jwt.encode(payload, clv);
   
     return token;
}