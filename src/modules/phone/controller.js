"use strict";
var phoneModel = require("./model");
var phoneRepo = require("./repo");

var fs = require("fs");
var path = require("path");
const webp = require("webp-converter");

let validService = require("../../services/validator/validateParams")

const controller = {
  getById: async (req, res) => {
    const itemRepo = new phoneRepo();
    const modelItem = new phoneModel(itemRepo);
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
    const itemRepo = new phoneRepo();
    const modelItem = new phoneModel(itemRepo);

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
    const itemRepo = new phoneRepo();
    const modelItem = new phoneModel(itemRepo);

    let { phone, type, link } = req.body;

    if (phone == undefined || phone == null || phone == "") {
      return res.status(200).send({
        status: "error",
        message: "Teléfono no válida",
      });
    } 

    if (type == undefined || type == null || type == "") {
      return res.status(200).send({
        status: "error",
        message: "Tipo de teléfono no válida",
      });
    } 
    //guardar
    let result = await modelItem.create(phone, type, link);
    let status = "success";

    console.log(result)
    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  update: async (req, res) => {
    const itemRepo = new phoneRepo();
    const modelItem = new phoneModel(itemRepo);

    let { id, phone, type, link } = req.body;

    const validate = new validService()

    let validId = validate.validNum(id)

    if(!validId ){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.', 
      });
    }

    if (phone == undefined || phone == null || phone == "") {
      return res.status(200).send({
        status: "error",
        message: "Teléfono no válida",
      });
    }

    if (type == undefined || type == null || type == "") {
      return res.status(200).send({
        status: "error",
        message: "Tipo de teléfono no válida",
      });
    }

    //guardar
    let result = await modelItem.update(id, phone, type, link);
    let status = "success";
 
    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  delete: async (req, res) => {
    const itemRepo = new phoneRepo();
    const modelItem = new phoneModel(itemRepo);
    let params = req.body;

    let id = params.id;

    if (isNaN(id) || id == undefined || id == "" || id == null) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    //let phone = await modelItem.getById(id);

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
