const express = require('express');
const router = express.Router();
const mypage = require('../controller/mypage');
const { Op } = require('sequelize');
const db = require('../models');
const { tokenCheck } = require('../middleware/tokenCheck');
const { MatePost } = require('../models');

router.post('/info', tokenCheck, mypage.My_info);

router.get('/', tokenCheck, async (req, res, next) => {
  console.log('req.decoded', req.decoded);
  try {
    const myCrew = await db.sequelize.models.matePost_user_join.findAll({
      where: {
        User_id: req.decoded.id,
      },
      atattributes: ['MatePost_id'],
    });
    console.log('myCrew', myCrew);

    const myCrewInfo = await MatePost.findAll({
      where: {
        [Op.in]: [{ id: myCrew.dataValues }],
      },
    });
    console.log('myCrewInfo', myCrewInfo);
    res.status(200).json(myCrewInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
