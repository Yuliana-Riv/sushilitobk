"use strict";
var dayjs = require("dayjs");
const pool = require("../../db/appSQLClient");

class phoneRepository {
  async getById(id) {
    let response;
    const queryString = `SELECT * FROM phone WHERE id = ${id}`;
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
    const queryString = `SELECT * FROM phone`;
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

  async create(phone, type, link) {
    let response;

    const queryString2 = `INSERT INTO phone (phone, type, link) VALUES ( '${phone}','${type}','${link}')`;
    try {
      response = await pool.query(queryString2);
      response = "success";
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async update(id, phone, type, link ) {
    let response;
    let result;
    var update = dayjs().format("YYYY-MM-DD h:mm:ss");
    //validar que no exista el email en la bd

    try {
      const queryString3 = `SELECT * FROM phone WHERE id = ${id}`;
      response = await pool.query(queryString3);
      result = response.length;
      if (result == 0) return "No se encontro el registro.";
    } catch (error) {
      console.log(error);
      return "error";
    }

    const queryString2 = `UPDATE phone SET phone = '${phone}', type = '${type}', link = '${link}', updated_at = '${update}' WHERE id = ${id}`;
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
    const queryString2 = "DELETE FROM phone";
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

    const queryString2 = `DELETE FROM phone WHERE id = ${id}`;
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

module.exports = phoneRepository;
