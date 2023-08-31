'use strict'

const mysql = require('mysql');
const { promisify }= require('util');



//No es necesario comentar las config.
const getConfig = (mode) => { 
  const local = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'sushilito_db_32fhd',
   } 

   const live  = {
    host     : 'localhost',
    user     : 'sushilito_usr_db_32fhd',
    password : '$%ow3tghg23tadaH',
    database : 'sushilito_db_32fhd',
   } 

  if ( mode != 'live') return local
  return live
}

const pool = mysql.createPool(getConfig('local')); // si es cpanel enviar live, si es local enviar local o cualquier otra cosa.

pool.getConnection((err, connection) =>{
  let message ='Success'

    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
         
          message='Database connection was closed.'
         
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
        
          message='Database has to many connections'
        }
        if (err.code === 'ECONNREFUSED') {
    
          message='Database connection was refused'
        }
      }
    
      if (connection) connection.release();

      message == 'Success' ? message ='Success: DB is Conected' : message= 'Error: '+message
      console.log(message);
    
      return;
})


// Promisify Pool Querys
pool.query = promisify(pool.query);
module.exports = pool ;