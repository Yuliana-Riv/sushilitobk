'use strict'

class bannerModel {
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


    
    async create(link,  image , image_mv, type) {
        let response;
        try {
            response = await  this.repository.create( link,  image , image_mv, type);
          
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

module.exports = bannerModel;