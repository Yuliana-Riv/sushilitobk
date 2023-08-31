"use strict";
var dayjs = require("dayjs");
const pool = require("../../db/appSQLClient");

class social_mediaRepository {
  async getById(id) {
    let response;
    const queryString = `SELECT * FROM social_media WHERE id = ${id}`;
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
    const queryString = `SELECT * FROM social_media`;
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

  async create(social_media, link) {
    let response;

    const queryString2 = `INSERT INTO social_media (social_media, link) VALUES ( '${social_media}','${link}' )`;
    try {
      response = await pool.query(queryString2);
      response = "success";
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async update(id, social_media, link) {
    let response;
    let result;
    var update = dayjs().format("YYYY-MM-DD h:mm:ss");
    //validar que no exista el email en la bd

    try {
      const queryString3 = `SELECT * FROM social_media WHERE id = ${id}`;
      response = await pool.query(queryString3);
      result = response.length;
      if (result == 0) return "No se encontro el registro.";
    } catch (error) {
      console.log(error);
      return "error";
    }

    const queryString2 = `UPDATE social_media SET social_media = '${social_media}', link = '${link}', updated_at = '${update}' WHERE id = ${id}`;
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
    const queryString2 = "DELETE FROM social_media";
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

    const queryString2 = `DELETE FROM social_media WHERE id = ${id}`;
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

module.exports = social_mediaRepository;
