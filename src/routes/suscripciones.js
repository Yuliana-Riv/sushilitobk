"use strict";

let express = require("express");
const router = express.Router();
let md_auth = require("../middlewares/authenticated");
const { authenticated, authp } = require("../middlewares/authenticated");

let suscripciones = require("../modules/suscripciones/controller");

router.get("/suscripciones",  suscripciones.getAll);
router.get("/suscripciones/:id",  suscripciones.getById);
router.get("/buscar/suscripciones/:search",  suscripciones.search);

router.post(
  "/suscripciones/create", suscripciones.create
);
router.delete(
  "/suscripciones/delete", suscripciones.delete
);

module.exports = router;
