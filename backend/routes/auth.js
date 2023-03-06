const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { tokenCheck } = require('../middleware/tokenCheck');

router.post('/signup', async (req, res, next) => {
  const { id, nickName, pw, city, name, phone } = req.body;
  console.log('들어온정보', req.body);

  try {
    const exUser = await User.findOne({ where: { id: id } });
    const exnickName = await User.findOne({ where: { nickName: nickName } });

    if (exUser) {
      return res.status(403).send('존재하는 ID입니다.');
    }
    if (exnickName) {
      return res.status(403).send('존재하는 닉네임입니다.');
    }
    //const hash = await bcrypt.hash(pw, 12);
    await User.create({
      id,
      nickName,
      pw,
      name,
      city,
      phone,
    });
    return res.status(200).send('회원가입 성공');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { id, pw } = req.body;
  console.log(req.body);
  try {
    const userInfo = await User.findOne({
      where: { id },
      // attributes: ['nickName', 'id', 'pw'],
    });
    if (!userInfo) return res.status(403).send('유저 정보가 없습니다.');
    if (userInfo.pw != pw) {
      return res.status(403).send('비밀번호가 일치 하지 않습니다.');
    }
    delete userInfo.dataValues['pw'];
    console.log(userInfo.dataValues);
    //access 토큰 발급
    //3번쨰 인자는 발행자, 유효기간 등을 담을 수 있다.
    // const accessToken = jwt.sign({
    //   id: userInfo.id,
    //   name: userInfo.name,
    // },process.env.REFRESH_SECRET,{
    //   expiresIn: '24h',//1분
    //   issuer : 'we'
    // })

    const accessToken = jwt.sign(
      {
        type: 'JWT',
        id: userInfo.id,
        nickName: userInfo.nickName,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: '45m', // 만료시간 15분
        issuer: 'we',
      }
    );

    // token 전송
    res.cookie('accessToken', accessToken, {
      secure: false, //https, http차이 명시
      httpOnly: true,
    });

    res.status(200).json({
      message: '로그인 성공!',
      data: userInfo.dataValues,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/userinfo', tokenCheck, async (req, res, next) => {
  console.log(req.decoded);
  res.send('로그인 성공');
});

router.put('/updateInfo', async (req, res, next) => {
  const { id, nickName, name, city, phone } = req.body;
  try {
    await User.update(
      {
        nickName: nickName,
        name: name,
        city: city,
        phone: phone,
      },
      { where: { id: id } }
    );
    res.send('회원정보 수정');
  } catch (err) {
    console.log(err);
  }
});

router.delete('/delInfo', async (req, res, next) => {
  const { id, nickName, name, pw, city, phone } = req.body;
  try {
    await User.destroy(
      { where: { id: id } },
      {
        id: id,
        pw: pw,
        nickName: nickName,
        name: name,
        city: city,
        phone: phone,
      }
    );
    res.send('회원탈퇴');
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
