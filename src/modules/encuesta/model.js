'use strict'

class encuestaModel {
    constructor(repository){
        this.repository = repository;
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

    async getById(id) {
        let response;

        try {
            response = await  this.repository.getById(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async create(data) {
        let response;

        try {
            response = await  this.repository.create(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async delete(data) {
        let response;

        try {
            response = await  this.repository.delete(data);
        } catch(error) {
            throw error;
        }

        return  response;
    }


};

module.exports = encuestaModel;