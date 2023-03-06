const express = require('express');
const router = express.Router();
const challenge = require('../controller/challenge');
const multer = require('../middleware/multer');

router.post('/putData', challenge.putData);
router.post('/searchData', challenge.searchData);
router.post('/upLoadData', multer.upLoadImg, challenge.upLoadData);
router.delete('/deleteData', challenge.deleteData);

module.exports = router;
