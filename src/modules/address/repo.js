"use strict";
var dayjs = require("dayjs");
const pool = require("../../db/appSQLClient");

class addressRepository {
  async getById(id) {
    let response;
    const queryString = `SELECT * FROM address WHERE id = ${id}`;
    try {
      response = await pool.query(queryString);
      if (response.length > 0) {
        response = response[0];
      } else {
        response = "No se encontraron coincidencias";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async getAll() {
    let response;
    const queryString = `SELECT * FROM address `;
    try {
      response = await pool.query(queryString);
      if (response.length == 0) {
        response = "No se encontraron coincidencias";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async create(address, colonia, zip, city, state, country) {
    let response;

    const queryString2 = `INSERT INTO address (address, colonia, zip, city, state, country) VALUES ( '${address}', '${colonia}', '${zip}', '${city}', '${state}', '${country}')`;
    try {
      response = await pool.query(queryString2);
      response = "success";
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async update(id, address, colonia, zip, city, state, country) {
    let response;
    let result;
    var update = dayjs().format("YYYY-MM-DD h:mm:ss");
    //validar que no exista el email en la bd

    try {
      const queryString3 = `SELECT * FROM address WHERE id = ${id}`;
      response = await pool.query(queryString3);
      result = response.length;
      if (result == 0) return "No se encontro el registro.";
    } catch (error) {
      console.log(error);
      return "error";
    }

    const queryString2 = `UPDATE address SET 
        address = '${address}' , colonia = '${colonia}', zip = '${zip}', city = '${city}',  state = '${state}',  country = '${country}',  updated_at = '${update}' 
         WHERE id = ${id}`;
    try {
      response = await pool.query(queryString2);
      response = "success";
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async deleteAll() {
    let response;
    const queryString2 = "DELETE FROM address";
    try {
      response = await pool.query(queryString2);
      if (response.affectedRows > 0) {
        response = "success";
      } else {
        response = "error";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async delete(id) {
    let response;

    var update = dayjs().format("YYYY-MM-DD h:mm:ss");

    const queryString2 = `DELETE FROM address WHERE id = ${id}`;
    try {
      response = await pool.query(queryString2);
      if (response.affectedRows > 0) {
        response = "success";
      } else {
        response = "error";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }
}

module.exports = addressRepository;
