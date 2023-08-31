'use strict'

class social_mediaModel {
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


    
    async create(social_media, link) {
        let response;
        try {
            response = await  this.repository.create(social_media, link);
          
        } catch(error) {
            throw error;
        }

        return  response;
    } 

    async update(id, social_media, link) {
        let response;
        try {
            response = await  this.repository.update(id, social_media, link);
          
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

module.exports = social_mediaModel;