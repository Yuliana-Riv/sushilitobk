'use strict'

class userModel {
    constructor(repository){
        this.repository = repository;
    }

    async last(){
        let response;
        try {
            response = await  this.repository.last();
        } catch(error) {
            throw error;
        }
        return  response;

    }

    
   async getAll() {
        let response;

        try {
            response = await  this.repository.getAll();
         
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getAll2() {
        let response;

        try {
            response = await  this.repository.getAll2();
         
        } catch(error) {
            throw error;
        }

        return  response;
    }
    
    async getById(id) {
        let response;

        try {
            response = await  this.repository.getById(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getById2(id) {
        let response;

        try {
            response = await  this.repository.getById2(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async  createSession(id_user, code, type){
        let response;

        try {
            response = await  this.repository.createSession(id_user, code,type);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getSession(id){

        let response;

        try {
            response = await  this.repository.getSession(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async delExpSessions(){
        let response;

        try {
            response = await  this.repository.delExpSessions();
          
        } catch(error) {
            throw error;
        }

        return  response;
    }




    async getByEmail(email){
        let response;

        try {
            response = await  this.repository.getByEmail(email);
          
        } catch(error) {
            throw error;
        }
        return  response;
    }

    async search(value) {
        let response;
        try {
            response = await  this.repository.search(value);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async delete(id) {
        let response;

        try {
            response = await  this.repository.delete(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async create(user) {
        let response;
      
        try {
            response = await  this.repository.create(user);
        } catch(error) {
            throw error;
        }

        return  response;
       
    }

    async update(user) {
        let response;
      
        try {
            response = await  this.repository.update(user);
        } catch(error) {
            throw error;
        }

        return  response;
       
    }
    async updateImage(data) {
        let response;
      
        try {
            response = await  this.repository.updateImage(data);
        } catch(error) {
            throw error;
        }
        console.log(response)
        return  response;
       
    }




};

module.exports = userModel;