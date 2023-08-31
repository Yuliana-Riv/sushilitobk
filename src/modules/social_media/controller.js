"use strict";
var social_mediaModel = require("./model");
var social_mediaRepo = require("./repo");

var fs = require("fs");
var path = require("path");
const webp = require("webp-converter");

let validService = require("../../services/validator/validateParams")

const controller = {
  getById: async (req, res) => {
    const itemRepo = new social_mediaRepo();
    const modelItem = new social_mediaModel(itemRepo);
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
    const itemRepo = new social_mediaRepo();
    const modelItem = new social_mediaModel(itemRepo);

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
    const itemRepo = new social_mediaRepo();
    const modelItem = new social_mediaModel(itemRepo);

    let { social_media, link } = req.body;

    if (social_media == undefined || social_media == null || social_media == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido",
      });
    } 

    if (link == undefined || link == null || link == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido",
      });
    }  
    //guardar
    let result = await modelItem.create(social_media, link);
    let status = "success";

    console.log(result)
    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  update: async (req, res) => {
    const itemRepo = new social_mediaRepo();
    const modelItem = new social_mediaModel(itemRepo);

    let { id, social_media, link } = req.body;

    const validate = new validService()

    let validId = validate.validNum(id)

    if(!validId ){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    } 
    if (social_media == undefined || social_media == null || social_media == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido",
      });
    } 

    if (link == undefined || link == null || link == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no válido",
      });
    }  

    //guardar
    let result = await modelItem.update(id, social_media, link);
    let status = "success";
 
    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  delete: async (req, res) => {
    const itemRepo = new social_mediaRepo();
    const modelItem = new social_mediaModel(itemRepo);
    let params = req.body;

    let id = params.id;

    if (isNaN(id) || id == undefined || id == "" || id == null) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    //let social_media = await modelItem.getById(id);

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
