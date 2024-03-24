const express =require('express');
const router =express.Router();

const authContoller = require('../Controller/authController');

router.post('/',authContoller.handleLogin);

module.exports = router ;