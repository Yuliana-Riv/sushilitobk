
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class profileRepository {
    async last(){
        let response; 
        
        try {
            const queryString = `SELECT *   FROM profile  ORDER BY id DESC LIMIT 1`;
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
            const queryString = `SELECT *   FROM profile  `; 
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
            const queryString = `SELECT *   FROM profile  WHERE id = ${id} `;
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




    async create({name, code, main}) {
        let response; 
      
       
        try {
            const queryString2 = `INSERT INTO profile (name, code, main) VALUES ( '${name}' ,'${code}','${main}')`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }


    async update({id, name, code, main}) {

      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
      
       
       
        try {
            const queryString3 = `SELECT * FROM profile WHERE id = ${id}`;
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
            const queryString2 = `UPDATE profile SET name = '${name}', code = '${code}', main = '${main}', updated_at = '${update}' WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }


       
       
        return response
    }




    async delete(id) {
     
        let response; 
      
        try {
            const queryString2 = `SELECT * FROM profile WHERE id = ${id}`;
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return 'Perfil no encontrado.'
                }
        } catch(error) {
            console.log(error);
            return  'Error al buscar el perfil.'
        }


      
    

       
        try {
            const queryString3 = `DELETE FROM profile WHERE id = ${id}`;
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar el perfil.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar el perfil'
        }

        return response
    }




    







 


};

module.exports = profileRepository;
