"use strict";

let express = require("express");
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
let multipart = require("connect-multiparty");
let multipartMiddleware = multipart({ uploadDir: "./uploads/banner" });
// banners

let banner = require("../modules/banner/controller");

router.get("/get-banner-image/:image", banner.getImageFile);

router.get("/banner/:id",[ authp], banner.getById);
router.get("/banner", [ authp], banner.getAll);
router.post("/banner/create",
  multipartMiddleware,
  [authenticated,authp], 
  banner.create
);
router.delete("/banner/delete", [authenticated,authp],  banner.delete);
router.put(
  "/actualizar_orden/update",
  multipartMiddleware,
  [authenticated,authp], 
  banner.actualizarOrden
);
router.get("/get-banner-image/:image", banner.getImageFile);

module.exports = router;
