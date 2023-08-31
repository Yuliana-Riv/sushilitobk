
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class colaboradorRepository {
    async last(){
        let response = 'error';
        try {
            const queryString = `SELECT * FROM colaborador ORDER BY id DESC LIMIT 1`;
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'error'
            }else{
                response = response[0]
            }
        } catch(error) {
            console.log(error);
        }

        return response
    }

 
    async getAll() {
        let response = 'error'
        try {
            const queryString = `SELECT * FROM colaborador  `; 
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
            const queryString = `SELECT * FROM colaborador WHERE id = ${id} `;
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

  
    async getByEmail(email) {
        let response = 'error'; 
        try {
            const queryString = `SELECT * FROM colaborador WHERE email = '${email}' `;
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0] 
            }else{
                response = 'No se encontraron coincidencias.'
            }
        }catch(error) {
            console.log(error);
        }
        return response
    }

    async delete(id) {
     
        let response = 'No fue posible eliminar el usuario.';
      
        try {
            const queryString2 = `SELECT * FROM colaborador WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.length ==0) return 'Colaborador no valido.'
        } catch(error) {
            console.log(error);
            return 'error'
        }


        try {
            const queryString2 = `SELECT * FROM casas WHERE id_colaborador = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.length > 0) return 'Existen casas ligadas a este colaborador, eliminalas primero.'
        } catch(error) {
            console.log(error);
            return 'error'
        }

        try {
            const queryString2 = `SELECT * FROM terrenos WHERE id_colaborador = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.length > 0) return 'Existen terrenos ligados a este colaborador, eliminalos primero.'
        } catch(error) {
            console.log(error);
            return 'error'
        }

        try {
            const queryString2 = `SELECT * FROM locales WHERE id_colaborador = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.length > 0) return 'Existen locales ligados a este colaborador, eliminalos primero.'
        } catch(error) {
            console.log(error);
            return 'error'
        }

        try {
            const queryString2 = `SELECT * FROM oficinas WHERE id_colaborador = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.length > 0) return 'Existen oficinas ligadas a este colaborador, eliminalas primero.'
        } catch(error) {
            console.log(error);
            return 'error'
        }

       
        try {
            const queryString2 = `DELETE FROM colaborador WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
            response ='error'
        }

        return response
    }


    
    async create({email, pass , name , lastname ,  phone , wlink }) {
        let response = 'error'; 
      
      

       
        try {
            const queryString3 = `SELECT * FROM users WHERE email = '${email}'`;
            response =  await pool.query(queryString3) 
            if(response.length > 0)return 'Email ya registrado.'
        } catch(error) {
            console.log(error);
            return response
        }

        try {
            const queryString3 = `SELECT * FROM colaborador WHERE email = '${email}'`;
            response =  await pool.query(queryString3) 
            if(response.length > 0)return 'Email ya registrado.'
        } catch(error) {
            console.log(error);
            return response
        }
        

      
        const queryString2 = `INSERT INTO colaborador ( email, pass , name , lastname , phone ,  wlink ) VALUES ( 
           '${email}', '${pass}' , '${name}' , '${lastname}' ,  '${phone}' ,  '${wlink}' )`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }


    async update({id, email, pass , name , lastname ,  phone ,  wlink }) {
      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        //validar que no exista el email en la bd
       
        try {
            const queryString3 = `SELECT * FROM users WHERE email = '${email}'`;
            response =  await pool.query(queryString3) 
            if(response.length > 0)return 'Email ya registrado.'
        } catch(error) {
            console.log(error);
            return response
        }
       
        try {
            const queryString3 = `SELECT * FROM colaborador WHERE id = ${id}`;
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0) return 'No se encontro el usuario'
        } catch(error) {
            console.log(error);
            return 'error'
        }



       
        try {
            const queryString = `SELECT * FROM colaborador WHERE email = '${email}'`;
            response =  await pool.query(queryString) 
            result = response.length
            if(result >0 && response[0].id != id) return 'Email ya registrado'
        } catch(error) {
            console.log(error);
           return 'error'
        }

       



        const queryString2 = `UPDATE colaborador SET  email = '${email}',pass = '${pass}' , name ='${name}' , lastname = '${lastname}' ,  phone = '${phone}' ,  wlink = '${wlink}'  ,   updated_at = '${update}' WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }


       
       
        return response
    }





    async updateImage({id, image}) {
        let response; 
        let result
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        const queryString = `SELECT * FROM colaborador WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString) 
            result = response.length
            if(result>0){
                const queryString2 = `UPDATE colaborador SET image = '${image}' , updated_at = '${update}' WHERE id = ${id}`;
                            try {
                                response =  await pool.query(queryString2) 
                            
                                response = 'success'
                            } catch(error) {
                                console.log(error);
                                response = 'error'
                            }
            }else{
               response='No se encontro el usuario'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
          
        }
       
        return response
    }



    async getAllFotosTerrenos(id_colaborador) {
        let response = []
        try {
            const queryString = `SELECT tf.* FROM terrenos_fotos as tf 
             INNER JOIN terrenos as t ON tf.id_terreno = t.id
             INNER JOIN colaborador  as c ON t.id_colaborador = c.id WHERE c.id = ${id_colaborador} `; 
            response =  await pool.query(queryString) 
        } catch(error) {
            console.log(error);
        }
        
        return response
    }

    async getAllFotosCasas(id_colaborador){
        let response = []
        try {
            const queryString = `SELECT tf.* FROM casas_fotos as tf 
             INNER JOIN casas as t ON tf.id_casa = t.id
             INNER JOIN colaborador  as c ON t.id_colaborador = c.id WHERE c.id = ${id_colaborador} `; 
            response =  await pool.query(queryString) 
        } catch(error) {
            console.log(error);
        }
        
        return response
    }


    async getAllFotosLocales(id_colaborador){
        let response = []
        try {
            const queryString = `SELECT tf.* FROM locales_fotos as tf 
             INNER JOIN locales as t ON tf.id_local = t.id
             INNER JOIN colaborador  as c ON t.id_colaborador = c.id WHERE c.id = ${id_colaborador} `; 
            response =  await pool.query(queryString) 
        } catch(error) {
            console.log(error);
        }
        
        return response
    }


    async getAllFotosOficinas(id_colaborador){
        let response = []
        try {
            const queryString = `SELECT tf.* FROM oficinas_fotos as tf 
             INNER JOIN oficinas as t ON tf.id_oficina = t.id
             INNER JOIN colaborador  as c ON t.id_colaborador = c.id WHERE c.id = ${id_colaborador} `; 
            response =  await pool.query(queryString) 
        } catch(error) {
            console.log(error);
        }
        
        return response
    }



};

module.exports = colaboradorRepository;
