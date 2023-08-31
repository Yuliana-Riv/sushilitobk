"use strict";

let express = require("express");
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
let multipart = require("connect-multiparty");
let multipartMiddleware = multipart({ uploadDir: "./uploads/sucursales" });
// sucursales

let sucursales = require("../modules/sucursales/controller");

router.get("/sucursales/:id",[ authp], sucursales.getById);
router.get("/sucursales", [ authp], sucursales.getAll);
router.post("/sucursales/create",
  multipartMiddleware,
  [authenticated,authp], 
  sucursales.create
);
router.delete("/sucursales/delete", [authenticated,authp],  sucursales.delete);
router.put(
  "/sucursales/update",
  multipartMiddleware,
  [authenticated,authp], 
  sucursales.update
);
router.get("/get-sucursales-image/:image", sucursales.getImageFile);

/* TELEFONO*/
router.post("/sucursales_tel/create",
  multipartMiddleware,
  [authenticated,authp], 
  sucursales.create
);
router.delete("/sucursales_tel/delete", [authenticated,authp],  sucursales.delete);


module.exports = router;


