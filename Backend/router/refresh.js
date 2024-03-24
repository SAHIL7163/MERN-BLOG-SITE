const express =require('express');
const router = express.Router();

const refreshContoller = require('../Controller/refreshTokenController')
router.get('/',refreshContoller.handleRefreshToken);


module.exports =router;

