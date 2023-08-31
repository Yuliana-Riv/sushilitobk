'use strict'

let  express = require('express');
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/users'})



let user = require ('../modules/user/controller');
let log = require ('../modules/user/logController');

router.get('/usuarios', [authenticated,authp] , user.getAll);
router.get('/user/:id',  [authenticated,authp], user.getById);
router.get('/buscar/usuarios/:search',  [authenticated,authp] , user.search);

router.post('/user/create', [authenticated,authp], user.create);
router.put('/user/update/', [authenticated,authp] , user.update);
router.put('/user/upload/image/:id', multipartMiddleware,[authenticated,authp] , user.uploadImage)
router.delete('/user/delete', [authenticated,authp] , user.delete)

router.get('/user-img/:image', user.getImageFile);
router.get('/public-img/:image', user.getPublicImageFile);


router.post('/login', [authp], log.login);
router.post('/reenviar-codigo',[authp], log.reenviarCodigo);
router.post('/create-auth', [authenticated,authp], log.createAuth);
router.post('/get-auth', [authenticated,authp], log.getAuth);

router.post('/info_usr',  [authenticated,authp] , log.getData)
router.post('/session/create',  [authenticated,authp] , log.valSession)

router.post('/j43-wdrDE4s_wffs2/contacto', user.contacto);


module.exports = router;