"use strict";
var horarioModel = require("./model");
var horarioRepo = require("./repo");

var fs = require("fs");
var path = require("path");
const webp = require("webp-converter");

let validService = require("../../services/validator/validateParams")

const controller = {
  getById: async (req, res) => {
    const itemRepo = new horarioRepo();
    const modelItem = new horarioModel(itemRepo);
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
    const itemRepo = new horarioRepo();
    const modelItem = new horarioModel(itemRepo);

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
    const itemRepo = new horarioRepo();
    const modelItem = new horarioModel(itemRepo);

    let { start_day, end_day, start_hour, end_hour } = req.body;

    if (start_day == undefined || start_day == null || start_day == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido 1",
      });
    } 

    if (end_day == undefined || end_day == null  ) {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido 2",
      });
    } 

    if (start_hour == undefined || start_hour == null || start_hour == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido 3",
      });
    } 

    if (end_hour == undefined || end_hour == null || end_hour == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido 4",
      });
    } 
    //guardar
    let result = await modelItem.create(start_day, end_day, start_hour, end_hour);
    let status = "success";

    console.log(result)
    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  update: async (req, res) => {
    const itemRepo = new horarioRepo();
    const modelItem = new horarioModel(itemRepo);

    let { id, start_day, end_day, start_hour, end_hour } = req.body;

    const validate = new validService()

    let validId = validate.validNum(id)

    if(!validId ){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    }

    if (start_day == undefined || start_day == null || start_day == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido",
      });
    } 

    if (end_day == undefined || end_day == null || end_day == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido",
      });
    } 

    if (start_hour == undefined || start_hour == null || start_hour == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido",
      });
    } 

    if (end_hour == undefined || end_hour == null || end_hour == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido",
      });
    } 

    //guardar
    let result = await modelItem.update(id, start_day, end_day, start_hour, end_hour);
    let status = "success";
 
    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  delete: async (req, res) => {
    const itemRepo = new horarioRepo();
    const modelItem = new horarioModel(itemRepo);
    let params = req.body;

    let id = params.id;

    if (isNaN(id) || id == undefined || id == "" || id == null) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    //let horario = await modelItem.getById(id);

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
