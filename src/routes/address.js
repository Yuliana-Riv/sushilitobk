"use strict";

let express = require("express");
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
// address

let address = require("../modules/address/controller"); 

router.get("/address/:id", [authp], address.getById);
router.get("/address", [authp], address.getAll);
router.post("/address/create", [authenticated,authp], address.create);
router.put("/address/update", [authenticated,authp], address.update);
router.delete("/address/delete", [authenticated,authp],  address.delete); 

module.exports = router;
