
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class personalizeRepository {
    async last(){
        let response; 
        
        try {
            const queryString = `SELECT *   FROM personalize  ORDER BY id DESC LIMIT 1`;
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'error'
            }else{
                response = response[0]
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

   

     async getAll() {
        let response; 
       
      
        try {
            const queryString = `SELECT *   FROM personalize  `; 
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response
               
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }
        
        return response
    }


   
    async getById(id) {
     
        let response; 
        
        try {
            const queryString = `SELECT *   FROM personalize  WHERE id = ${id} `;
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0]
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }




  


    async update({id, logo}) {

      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
      
       
       
        try {
            const queryString3 = `SELECT * FROM personalize WHERE id = ${id}`;
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro el perfil'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }


        try {
            const queryString2 = `UPDATE personalize SET logo = '${logo}', updated_at = '${update}' WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       
       
        return response
    }




};

module.exports = personalizeRepository;
