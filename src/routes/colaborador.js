'use strict'

let  express = require('express');
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/colaborador'})



let colaborador = require ('../modules/colaborador/controller');

router.get('/colaborador', [authenticated,authp] , colaborador.getAll);
router.get('/colaborador/:id',  [authenticated,authp], colaborador.getById);

router.post('/colaborador/create', [authenticated,authp], colaborador.create);
router.put('/colaborador/update/', [authenticated,authp] , colaborador.update);
router.put('/colaborador/upload/image/:id',[authenticated,authp], multipartMiddleware , colaborador.uploadImage)
router.delete('/colaborador/delete', [authenticated,authp] , colaborador.delete)

router.get('/colaborador-img/:image', colaborador.getImageFile);




module.exports = router;