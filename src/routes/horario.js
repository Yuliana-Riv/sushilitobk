"use strict";

let express = require("express");
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
// horario

let horario = require("../modules/horario/controller"); 

router.get("/horario/:id", [authp], horario.getById);
router.get("/horario", [authp], horario.getAll);
router.post("/horario/create", [authenticated,authp], horario.create);
router.put("/horario/update", [authenticated,authp], horario.update);
router.delete("/horario/delete", [authenticated,authp],  horario.delete); 

module.exports = router;
