'use strict'

class horarioModel {
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


    
    async create(start_day, end_day, start_hour, end_hour) {
        let response;
        try {
            response = await  this.repository.create(start_day, end_day, start_hour, end_hour);
          
        } catch(error) {
            throw error;
        }

        return  response;
    } 

    async update(id, start_day, end_day, start_hour, end_hour) {
        let response;
        try {
            response = await  this.repository.update(id, start_day, end_day, start_hour, end_hour);
          
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

module.exports = horarioModel;