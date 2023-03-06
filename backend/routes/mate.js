const User = require('../models/User');
const express = require('express');
const router = express.Router();
const MatePost = require('../models/MatePost');
const { tokenCheck } = require('../middleware/tokenCheck');
const { Op } = require('sequelize');
const fs = require('fs');
const db = require('../models');

router.get('/', async (req, res, next) => {
  // console.log(req.query);

  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }

    const posts = await MatePost.findAll({
      where,
      limit: 10,
      // order: [
      //   ['id', 'DESC'],
      // ],
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['nickName'], //따로 user테이블에서 가져온다.
        },
      ],
    });
    // console.log(posts);

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/addcrew', tokenCheck, async (req, res, next) => {
  const { crewId } = req.body;
  console.log(req.body);
  try {
    const matePost = await MatePost.findOne({ where: { id: crewId } });
    if (!matePost) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await matePost.addUsers(req.decoded.id);
    res.send('가입성공');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/outcrew', tokenCheck, async (req, res, next) => {
  const { crewId } = req.body;

  try {
    const matePost = await MatePost.findOne({ where: { id: crewId } });
    if (!matePost) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    console.log(matePost);
    const crewMember = await db.sequelize.models.matePost_user_join.findAll({
      where: {
        MatePost_id: crewId,
      },
      attributes: ['MatePost_id'],
    });
    console.log('crewMember', crewMember);
    if (crewMember.length == 1) {
      await MatePost.destroy({
        where: { id: crewId },
      });
      fs.unlinkSync(`../${process.env.ROUTE}${matePost.dataValues.image}`);
    }
    await matePost.removeUsers(req.decoded.id);
    res.send('탈퇴성공');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//데이터 받은 후 state수정
//로그인 실패등 400번대 이런거 확인하기
//다 로그인 성공시에만 이용가능 state에 유저정보 없으면 일단 막아라

//생성
router.post('/create', tokenCheck, async (req, res, next) => {
  console.log(req.body);
  const { title, info, max } = req.body;
  try {
    const crew = await MatePost.create({
      title,
      info,
      max,
      User_nickName: req.decoded.nickName,
    });
    //console.log(record);
    const matePost = await MatePost.findOne({
      where: { id: crew.dataValues.id },
    });
    if (!matePost) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await matePost.addUsers(req.decoded.id);
    res.status(200).json(crew);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//수정
router.patch('/', tokenCheck, async (req, res, next) => {
  console.log(req.body);
  const { title, info, max, crewId } = req.body;
  try {
    const crew = await MatePost.update(
      {
        title,
        info,
        max,
        User_nickName: req.decoded.nickName,
      },
      {
        where: { id: crewId },
      }
    );
    //console.log(record);
    res.status(201).send('수정완료');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//삭제 axios.delete(`/mate/${data}`);
router.delete('/:crewId', tokenCheck, async (req, res, next) => {
  try {
    const crew = await MatePost.destroy({
      where: {
        id: req.params.crewId,
        User_nickName: req.decoded.nickName,
      },
    });
    //console.log(record);
    res.status(201).send('삭제 완료');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
