const Challenge = require('../models/Challenge');
const MatePost = require('../models/MatePost');
const User = require('../models/User');
const { Op } = require('sequelize');
const db = require('../models');
exports.My_info = async (req, res, next) => {
  console.log('정보확인', req.body);
  try {
    // db에서 유저 정보 불러오기
    const userInfo = await User.findOne({
      raw: true,
      where: { id: req.body.id },
      attributes: ['nickName', 'id', 'name', 'city'],
    });
    // db에서 기부금 정보 불러오기
    const amount = await Challenge.findAll({
      raw: true,
      where: { user_id: req.body.id },
      attributes: ['amount'],
    });
    console.log('req.decoded', req.decoded);
    const myCrew = await db.sequelize.models.matePost_user_join.findAll({
      where: {
        User_id: req.decoded.id,
      },
      atattributes: ['MatePost_id'],
    });
    console.log(
      'myCrew',
      myCrew.map((e) => e.dataValues.MatePost_id)
    );
    const myCrewInfo = await MatePost.findAll({
      where: {
        id: {
          [Op.in]: myCrew.map((e) => e.dataValues.MatePost_id),
        },
      },
    });
    console.log('myCrewInfo', myCrewInfo);
    res.send({
      info: userInfo,
      amount: amount.reduce((a, c) => a + c.amount, 0),
      crew: myCrewInfo,
    });
    // res.status(200).json(myCrewInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
  // const crewInfo = await MatePost.findAll({
  //   raw: true,
  //   where: { User_nickName: req.body.nickname },
  //   attributes: ['title', 'info'],
  // });
  // info: 유저 정보, amount: 기부금 총 합
};
