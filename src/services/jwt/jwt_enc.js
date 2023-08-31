'use strict' 

var jwt = require('jwt-simple');
var dayjs = require('dayjs')

exports.createToken = (user,code) =>{

    const clv='#4qwd_313fgDog23w-8hWDaeg3VdgrH24C-lwfeDZ3C2W46S.3486wV-Dpw4eg9sF5' 

     var payload ={
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
    let token = jwt.encode(payload, clv)
     return token;
}