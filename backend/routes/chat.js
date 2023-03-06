const User = require('../models/User');
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const db = require('../models');
const { Op } = require('sequelize');
const { tokenCheck } = require('../middleware/tokenCheck');

router.post('/message', tokenCheck, async (req, res, next) => {
  // console.log(req.body);
  const { chat, nickName, room } = req.body;
  try {
    const chatInfo = await Chat.create({
      User_nickName: nickName,
      MatePost_id: String(room),
      chat,
    });
    // console.log(chat);
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.send(true);
});

router.post('/load', tokenCheck, async (req, res, next) => {
  // console.log(req.body);
  const { currentCrew, offset } = req.body;
  console.log('id', req.decoded.id, offset);
  const userCrewJoinTime = await db.sequelize.models.matePost_user_join.findOne(
    {
      where: {
        MatePost_id: currentCrew,
        User_id: req.decoded.id, //자동id여서 아이디값을 보내줘야한다.
      },
      attributes: ['createdAt'],
    }
  );

  console.log(userCrewJoinTime);
  // console.log('38', userCrewJoinTime);
  //유저가 방에 언제 입장한지 알아낸 후 그 이후의 대화만 보여주기 위해
  let offsetId = offset || 3000; //300은 임시다. chat데이터의 가장 마지막 id값 가져오기
  const chatList = await Chat.findAll({
    where: {
      createdAt: { [Op.gt]: userCrewJoinTime.createdAt },
      MatePost_id: currentCrew,
      id: { [Op.lt]: offsetId },
    },
    order: [['id', 'DESC']],
    limit: 20,
  });
  // console.log('chatList', chatList);

  res.send(chatList);
});
router.post('/recent', tokenCheck, async (req, res, next) => {
  // console.log(req.body);
  try {
    const recentChat = await Chat.findOne({
      where: {
        User_nickName: req.decoded.nickName,
      },
      order: [['id', 'DESC']],
      attributes: ['MatePost_id'],
    });

    res.status(200).json(recentChat);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
