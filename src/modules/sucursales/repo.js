'use strict'
var dayjs = require('dayjs');
const pool = require("../../db/appSQLClient");

class sucursalesRepository {



    async getById(id) {
        let response;
        const queryString = `SELECT * FROM sucursales WHERE id = ${id}`;
        try {
            response = await pool.query(queryString)
            if (response.length > 0) {
                response = response[0]
            } else {
                response = 'No se encontraron coincidencias'
            }
        } catch (error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    async getAll() {
        let response;
        const queryString = `SELECT * FROM sucursales `;
        try {
            response = await pool.query(queryString)
            if (response.length == 0) {
                response = 'No se encontraron coincidencias'
            }
        } catch (error) {
            console.log(error);
            response = 'error'
        }

        return response
    }


    async create(nombre, tipo, image, direccion, mapa) {
        let response;


        const queryString2 = `INSERT INTO sucursales (nombre, tipo, image, direccion, mapa) VALUES ( '${nombre}', '${tipo}', '${image}', '${direccion}', '${mapa}')`;
        try {
            response = await pool.query(queryString2)
           
        } catch (error) {
            console.log(error);
            response = 'error'
        }


        return response
    }

    async update({
        id,
        nombre,
        tipo,
        image,
        direccion,
        mapa

    }) {
        let result;
        let response;
        var update = dayjs().format("YYYY-MM-DD h:mm:ss");

        console.log(image)
        try {
            const queryString3 = `SELECT * FROM sucursales WHERE id = ${id}`;
            response = await pool.query(queryString3);
            result = response.length;
            if (result == 0) {
                return (response = "No se encontro la sucursal.");
            }
        } catch (error) {
            console.log(error);
            return (response = "error");
        }

        try {
            const queryString2 = `UPDATE sucursales SET nombre = '${nombre}', tipo = '${tipo}', direccion = '${direccion}' ,mapa = '${mapa}',image =  '${image}', updated_at = '${update}' WHERE id = ${id}`;
            response = await pool.query(queryString2);
            response = "success";
        } catch (error) {
            console.log(error);
            response = "error";
        }

        return response;
    }



    async delete(id) {
        let response;

        var update = dayjs().format('YYYY-MM-DD h:mm:ss')

        const queryString2 = `DELETE FROM sucursales WHERE id = ${id}`;
        try {
            response = await pool.query(queryString2)
            if (response.affectedRows > 0) {
                response = 'success'
            } else {
                response = 'error'
            }
        } catch (error) {
            console.log(error);
            response = 'error'
        }


        return response
    }

    /*Métodos de teléfonos*/
    
    async create_tel({id_sucursal, numero}) {
        let response;


        const queryString2 = `INSERT INTO tel_sucursales (id_sucursal, numero) VALUES ( ${id_sucursal}, '${numero}')`;
        try {
            response = await pool.query(queryString2)
            response = 'success'
        } catch (error) {
            console.log(error);
            response = 'error'
        }


        return response
    }

    async delete_tel(id) {
        let response;

        var update = dayjs().format('YYYY-MM-DD h:mm:ss')

        const queryString2 = `DELETE FROM tel_sucursales WHERE id = ${id}`;
        try {
            response = await pool.query(queryString2)
            if (response.affectedRows > 0) {
                response = 'success'
            } else {
                response = 'error'
            }
        } catch (error) {
            console.log(error);
            response = 'error'
        }


        return response
    }


    async getTelBySuc(id_sucursal) {
        let response;
        const queryString = `SELECT * FROM tel_sucursales WHERE id_sucursal = ${id_sucursal} `;
        try {
            response = await pool.query(queryString)
            if (response.length == 0) {
                response = 'No se encontraron coincidencias'
            }
        } catch (error) {
            console.log(error);
            response = 'error'
        }

        return response
    }







};

module.exports = sucursalesRepository;
