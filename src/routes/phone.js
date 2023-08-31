"use strict";

let express = require("express");
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
// phone

let phone = require("../modules/phone/controller"); 

router.get("/phone/:id", [authp], phone.getById);
router.get("/phone", [authp], phone.getAll);
router.post("/phone/create", [authenticated,authp], phone.create);
router.put("/phone/update", [authenticated,authp], phone.update);
router.delete("/phone/delete", [authenticated,authp],  phone.delete); 

module.exports = router;
