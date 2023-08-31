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


    
    async create(nombre, tipo, image, direccion, mapa) {
        let response;
        try {
            response = await  this.repository.create(nombre, tipo, image, direccion, mapa);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async update(JSON) {
        let response;
        try {
            response = await  this.repository.update(JSON);
          
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

    /*Métodos para telefonos */
    async create_tel(JSON) {
        let response;
        try {
            response = await  this.repository.create_tel(JSON);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async delete_tel(id) {
        let response;
        try {
            response = await  this.repository.delete_tel(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getTelBySuc(id_sucursal) {
        let response;
        try {
            response = await  this.repository.getTelBySuc(id_sucursal);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


};

module.exports = bannerModel;