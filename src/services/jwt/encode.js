'use strict' 

var jwt = require('jwt-simple');

exports.encode = (value) =>{

    const clv='wd-#2j5d1d_dd' 
    let token = jwt.encode(value, clv)
     return token// {decode,token};
}