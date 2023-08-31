"use strict";
var addressModel = require("./model");
var addressRepo = require("./repo");

var fs = require("fs");
var path = require("path");
const webp = require("webp-converter");

let validService = require("../../services/validator/validateParams")

const controller = {
  getById: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);
    let id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }
    let result = await modelItem.getById(id);

    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";
    } else {
      status = "error";
    }

    return res.status(200).send({
      status: status,
      result: result,
    });
  },

  getAll: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);

    let result = await modelItem.getAll();

    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";
    } else {
      status = "error";
    }

    return res.status(200).send({
      status: status,
      result: result,
    });
  },

  create: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);

    let { address, colonia, zip, city, state, country } = req.body;

    if (address == undefined || address == null || address == "") {
      return res.status(200).send({
        status: "error",
        message: "Direccion no válida",
      });
    }

    if (colonia == undefined || colonia == null || colonia == "") {
      return res.status(200).send({
        status: "error",
        message: "Colonia no válida",
      });
    }

    if (zip == undefined || zip == null || zip == "") {
      return res.status(200).send({
        status: "error",
        message: "Código postal no válida",
      });
    }

    if (city == undefined || city == null || city == "") {
      return res.status(200).send({
        status: "error",
        message: "Ciudad no válida",
      });
    }

    if (state == undefined || state == null || state == "") {
      return res.status(200).send({
        status: "error",
        message: "Estado no válido",
      });
    }

    if (country == undefined || country == null || country == "") {
      return res.status(200).send({
        status: "error",
        message: "País no válido",
      });
    }  
    //guardar
    let result = await modelItem.create(address, colonia, zip, city, state, country);
    let status = "success";

    console.log(result)
    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  update: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);

    let { id, address, colonia, zip, city, state, country } = req.body;

    const validate = new validService()

    let validId = validate.validNum(id)

    if(!validId ){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    }

    if (address == undefined || address == null || address == "") {
      return res.status(200).send({
        status: "error",
        message: "Direccion no válida",
      });
    }

    if (colonia == undefined || colonia == null || colonia == "") {
      return res.status(200).send({
        status: "error",
        message: "Colonia no válida",
      });
    }

    if (zip == undefined || zip == null || zip == "") {
      return res.status(200).send({
        status: "error",
        message: "Código postal no válida",
      });
    }

    if (city == undefined || city == null || city == "") {
      return res.status(200).send({
        status: "error",
        message: "Ciudad no válida",
      });
    }

    if (state == undefined || state == null || state == "") {
      return res.status(200).send({
        status: "error",
        message: "Estado no válido",
      });
    }

    if (country == undefined || country == null || country == "") {
      return res.status(200).send({
        status: "error",
        message: "País no válido",
      });
    }  
    //guardar
    let result = await modelItem.update(id, address, colonia, zip, city, state, country);
    let status = "success";
 
    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  delete: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);
    let params = req.body;

    let id = params.id;

    if (isNaN(id) || id == undefined || id == "" || id == null) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    //let address = await modelItem.getById(id);

    id = parseInt(params.id);

    let result = await modelItem.delete(id);

    let status = "success";
    result != "success" ? (status = "error") : status;
 

    return res.status(200).send({
      message: result,
      status: status,
    });
  },
  
};

module.exports = controller;
