const express =require('express');
const router = express.Router();

const logoutContoller = require('../Controller/logoutController');

router.get('/' , logoutContoller.handlelogOut);


module.exports =router;