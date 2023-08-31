
'use strict'

let  express = require('express');
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/logo'})

let personalize = require ('../modules/personalize/controller');

router.get('/personalize',[ authp],  personalize.getAll);
router.get('/personalize/:id', [ authp], personalize.getById);

router.put('/personalize/update/',multipartMiddleware ,  authenticated , personalize.update);
router.get('/personalize-img/:image', personalize.getImageFile);


module.exports = router;



