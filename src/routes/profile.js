
'use strict'

let  express = require('express');
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');


let profile = require ('../modules/profile/controller');

router.get('/profile', [authp],    profile.getAll);
router.get('/profile/:id', [authp],   profile.getById);

router.post('/profile/create', [authenticated, authp], profile.create);
router.put('/profile/update/', [authenticated, authp] , profile.update);
router.delete('/profile/delete', [authenticated, authp] , profile.delete)



module.exports = router;