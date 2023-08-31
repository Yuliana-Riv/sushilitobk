"use strict";

let express = require("express");
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
// social_media

let social_media = require("../modules/social_media/controller"); 

router.get("/social_media/:id", [authp], social_media.getById);
router.get("/social_media", [authp], social_media.getAll);
router.post("/social_media/create", [authenticated,authp], social_media.create);
router.put("/social_media/update", [authenticated,authp], social_media.update);
router.delete("/social_media/delete", [authenticated,authp],  social_media.delete); 

module.exports = router;
