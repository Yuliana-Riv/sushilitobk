'use strict'

class colaboradorModel {
    constructor(repository){
        this.repository = repository;
    }
    async last() {
        let response;

        try {
            response = await  this.repository.last();
         
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getAllFotosTerrenos(id_colaborador) {
        let response;

        try {
            response = await  this.repository.getAllFotosTerrenos(id_colaborador);
         
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getAllFotosCasas(id_colaborador){
        let response;

        try {
            response = await  this.repository.getAllFotosCasas(id_colaborador);
         
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async getAllFotosLocales(id_colaborador){
        let response;

        try {
            response = await  this.repository.getAllFotosLocales(id_colaborador);
         
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async getAllFotosOficinas(id_colaborador){
        let response;

        try {
            response = await  this.repository.getAllFotosOficinas(id_colaborador);
         
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

    async getById(id) {
        let response;

        try {
            response = await  this.repository.getById(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getByEmail(email) {
        let response;

        try {
            response = await  this.repository.getByEmail(email);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }
  
   
    async update(data) {
        let response;

        try {
            response = await  this.repository.update(data);
          
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

    
    async updateImage(data) {
        let response;

        try {
            response = await  this.repository.updateImage(data);
          
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

module.exports = colaboradorModel;