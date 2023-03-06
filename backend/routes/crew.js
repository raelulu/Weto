const express = require('express');
const router = express.Router();
const crew = require('../controller/crew');
const multer = require('../middleware/multer');
const { tokenCheck } = require('../middleware/tokenCheck');
router.get('/showCrew', crew.showCrew);
router.post('/putCrew', multer.upLoadImg, tokenCheck, crew.putCrew);
router.delete('/crewDel', crew.crewDel);

module.exports = router;
