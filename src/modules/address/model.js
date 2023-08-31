'use strict'

class addressModel {
    constructor(repository){
        this.repository = repository;
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
    
  
    
    async getAll() {
        let response;

        try {
            response = await  this.repository.getAll();
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    
    async create(address, colonia, zip, city, state, country) {
        let response;
        try {
            response = await  this.repository.create(  address, colonia, zip, city, state, country);
          
        } catch(error) {
            throw error;
        }

        return  response;
    } 

    async update(id, address, colonia, zip, city, state, country) {
        let response;
        try {
            response = await  this.repository.update(id, address, colonia, zip, city, state, country);
          
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

    async deleteAll() {
        let response;
        try {
            response = await  this.repository.deleteAll();
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

};

module.exports = addressModel;