
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class encuesta_repo {
 

 
    async getAll() {
        let response = 'error'
        try {
            const queryString = `SELECT * FROM encuesta  `; 
            response =  await pool.query(queryString) 
            if(response.length >0){ 
                response = response
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
        }
        
        return response
    }

 

    async getById(id) {
        let response = 'error'; 
        try {
            const queryString = `SELECT * FROM encuesta WHERE id = ${id} `;
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0] 
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
        }


        return response
    }


    async delete(id) {
     
        let response = 'No fue posible eliminar la encuesta.';
      
        try {
            const queryString2 = `SELECT * FROM encuesta WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.length ==0) return 'Enceusta no valido.'
        } catch(error) {
            console.log(error);
            return 'error'
        }

   
        try {
            const queryString2 = `DELETE FROM encuesta WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
            response ='error'
        }

        return response
    }


    
    async create({ num_ticket,
        p1 , 
        p2 , 
        p3, 
        p4 , 
        p5, 
        p6 , 
        p7  , 
        p8, 
        p9 , 
        p10, 
        p11}) {
        let response = 'error'; 
      
        

      
        const queryString2 = `INSERT INTO encuesta ( num_ticket,
            p1 , 
            p2 , 
            p3, 
            p4 , 
            p5, 
            p6 , 
            p7  , 
            p8, 
            p9 , 
            p10, 
            p11 ) VALUES ( 
           '${num_ticket}', '${p1}' , '${p2}' , '${p3}' ,  '${p4}' ,  '${p5}', '${p6}' ,  '${p7}' ,  '${p8}' , '${p9}' ,  '${p10}' ,  '${p11}')`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }







};

module.exports = encuesta_repo;
