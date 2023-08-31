'use strict' 
var userModel =require( "../../modules/user/model");
var usersRepo = require("../../modules/user/repo");

exports.execute = async (req, res) =>{
    const _repo = new usersRepo();
    const _model = new userModel( _repo);
  
    let  response = await _model.delExpSessions(); 


    let status ={
        message: 'Sesiones expiradas eliminadas.',
        response
    }
    
    return console.log(status)
 
}