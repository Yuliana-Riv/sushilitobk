
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class usersRepository {
    async last(){
        let response; 
        const queryString = `SELECT * FROM users ORDER BY id DESC LIMIT 1`;
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
        const queryString = `SELECT * FROM users WHERE name LIKE "%${value}%"  `; //`;
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
        const queryString = `SELECT * FROM users  `; // WHERE  role !='legrafica'`;
      
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

    async getAll2() {
        let response; 
        const queryString = `SELECT * FROM users `; // `;
      
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
        const queryString = `SELECT id, name, lastname,email, phone, image, role FROM users WHERE id = ${id} `;
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

    async getById2(id) {
     
        let response; 
        const queryString = `SELECT * FROM users WHERE id = ${id} `;
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

    async getByEmail(email) {
        
     
        let response; 
        const queryString = `SELECT * FROM users WHERE email = '${email}' `;
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
        const queryString2 = `SELECT * FROM users WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.length >0){
                    if(response[0].role != 'legrafica' ){
                        const queryString2 = `DELETE FROM users WHERE id = ${id}`;
                        try {
                                response =  await pool.query(queryString2) 
                                if(response.affectedRows > 0){
                                    response = 'success'
                                }else{
                                    response = 'No fue posible eliminar el usuario.'
                                }
                        } catch(error) {
                            console.log(error);
                            response = 'Error al intentar eliminar el usuario'
                        }
                    }else{
                        response = 'Usuario no valido.'
                    }
                }else{
                    response ='Usuario no encontrado.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al buscar el usuario.'
        }

        return response
    }


    async create(user) {
        let response; 
      
      

        const queryString3 = `SELECT * FROM users WHERE email = '${user.email}'`;
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

      
        try {
            const queryString3 = `SELECT * FROM colaborador WHERE email = '${user.email}'`;
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
        

      
        const queryString2 = `INSERT INTO users ( name, lastname,  email, pass ,phone, role) VALUES ( '${user.name}', '${user.lastname}',  '${user.email}', '${user.pass}', '${user.phone}', '${user.role}')`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }


    async update(user) {
      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        //validar que no exista el email en la bd
       
       
        try {
            const queryString3 = `SELECT * FROM users WHERE id = ${user.id}`;
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro el usuario'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

        try {
            const queryString3 = `SELECT * FROM colaborador WHERE email = '${user.email}'`;
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



      
        try {
            const queryString = `SELECT * FROM users WHERE email = '${user.email}'`;
            response =  await pool.query(queryString) 
            result = response.length
            if(result >0 && response[0].id != user.id){
               return   response='Email ya registrado'
            }
        } catch(error) {
            console.log(error);
           return response = 'error'
        
        }

       



        const queryString2 = `UPDATE users SET name = '${user.name}' , lastname = '${user.lastname}' ,  email = '${user.email}' , phone = '${user.phone}' ,role = '${user.role}' , pass = '${user.pass}' , updated_at = '${update}' WHERE id = ${user.id}`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }


       
       
        return response
    }





    async updateImage(data) {
        let response; 
        let result
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        const queryString = `SELECT * FROM users WHERE id = ${data.id}`;
        try {
            response =  await pool.query(queryString) 
            result = response.length
            if(result>0){
                const queryString2 = `UPDATE users SET image = '${data.image}' , updated_at = '${update}' WHERE id = ${data.id}`;
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


    async createSession(id_user, code, type){
        let response; 
        let exp = dayjs().add(1, 'days').format()

        //borramos en caso de que exista una session antigua.
        const queryString2 = `DELETE FROM session WHERE id_user = ${id_user} and type = '${type}'`;
        try {
                response =  await pool.query(queryString2)    
        } catch(error) {
            console.log(error);
        }




        const queryString3 = `INSERT INTO session ( id_user, code, exp,type) VALUES ( ${id_user}, '${code}',  '${exp}', '${type}')`;
        try {
            response =  await pool.query(queryString3) 
            
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }

    async delExpSessions(){
        let response; 
        let exp = dayjs().subtract(1,'days').format()

         //borramos en caso de que exista una session antigua.
         const queryString2 = `DELETE FROM session WHERE exp <  '${exp}'`;
         try {
                 response =  await pool.query(queryString2)    
         } catch(error) {
             console.log(error);
         }

         return response

    }

     async getSession(id){
        let response; 
        const queryString = `SELECT * FROM session WHERE id = ${id}  `; // `;
      
        try {
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0]
               
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

module.exports = usersRepository;
