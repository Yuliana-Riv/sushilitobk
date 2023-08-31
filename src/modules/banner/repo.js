'use strict'
var dayjs = require('dayjs');
const pool = require("../../db/appSQLClient");

class bannerRepository {

    

    async getById(id){
        let response; 
        const queryString = `SELECT * FROM banner WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0]
            }else{
                response = 'No se encontraron coincidencias'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    async getAll(){
        let response; 
        const queryString = `SELECT * FROM banner `;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'No se encontraron coincidencias'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

 
    async create( link,  image , image_mv, type) {
        let response; 
      

        const queryString2 = `INSERT INTO banner (link , image, image_mv, type) VALUES ( '${link}', '${image}', '${image_mv}', '${type}')`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       
    
        return response
    }

    async deleteAll(){
        let response; 
        const queryString2 = 'DELETE FROM banner';
        try {
                response =  await pool.query(queryString2) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'error'
                }
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       

        return response
    }

    async delete(id) {
        let response; 
     
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        
        const queryString2 = `DELETE FROM banner WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'error'
                }
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       

        return response
    }





     
  

};

module.exports = bannerRepository;
