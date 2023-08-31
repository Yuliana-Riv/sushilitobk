"use strict";

let express = require("express");
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
// encuesta

let encuesta = require("../modules/encuesta/controller"); 

router.get("/encuesta/:id", [authp, authenticated], encuesta.getById);
router.get("/encuesta", [authp, authenticated], encuesta.getAll);
router.post("/encuesta/create", [authp], encuesta.create);
router.delete("/encuesta/delete", [authenticated,authp],  encuesta.delete); 

module.exports = router;
