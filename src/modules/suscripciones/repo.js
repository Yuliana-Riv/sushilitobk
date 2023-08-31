
'use strict'
var dayjs = require('dayjs');
const pool = require("../../db/appSQLClient");

class suscripcionesRepository {
    async last(){
        let response; 
        const queryString = `SELECT *   FROM suscripciones  ORDER BY id DESC LIMIT 1`;
        try {
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

    async search(value){
        let response; 
        const queryString = `SELECT * FROM suscripciones  WHERE email LIKE "%${value}%"  `; 
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

     async getAll() {
        let response; 
        const queryString = `SELECT *   FROM suscripciones  `; 
      
        try {
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
        const queryString = `SELECT *  FROM suscripciones  WHERE id = ${id} `;
        try {
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


    

    

    async delete(id) {
     
        let response; 
        const queryString2 = `SELECT * FROM suscripciones WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='Suscripción no encontrada.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al buscar la suscripción'
        }


        const queryString3 = `DELETE FROM suscripciones WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar la suscripción.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar la suscripción.'
        }

        return response
    }


    async create(email, sub_date) {
        let response; 
      


        const queryString3 = `SELECT * FROM suscripciones WHERE email = '${email}'`;
        try {
            response =  await pool.query(queryString3) 
            if(response.length > 0){
                response = 'Email ya registrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }
        

      
        const queryString2 = `INSERT INTO suscripciones (email, sub_date) VALUES ( '${email}', '${sub_date}')`;
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

module.exports = suscripcionesRepository;
