const express =require('express');
const router = express.Router();

const newUserContoller = require('../Controller/newUserController');

router.post('/' , newUserContoller.handleNewUser);


module.exports =router;