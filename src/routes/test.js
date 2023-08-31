'use strict'

let  express = require('express');
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
// users
let test = require ('../modules/test/controller');

router.get('/test' ,  test.test);
router.get('/token' , test.token);



module.exports = router;