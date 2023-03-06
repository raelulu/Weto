const Challenge = require('../models/Challenge');
const User = require('../models/User');
const Proof = require('../models/Proof');
const fs = require('fs');

exports.putData = (req, res) => {
  // console.log('받은 데이터 확인', req.body);
  Challenge.create({
    user_id: req.body.user_id,
    user_phone: req.body.user_phone,
    challenge_name: req.body.challenge_name,
    amount: req.body.amount,
  });
  res.send(true);
};

exports.searchData = async (req, res) => {
  // console.log('받은 데이터 확인: ', req.body);
  const myChallengeData = await Challenge.findAll({
    raw: true,
    where: {
      challenge_name: req.body.challenge_name,
      user_id: req.body.user_id,
    },
  });
  const myProofData = await Proof.findAll({
    raw: true,
    where: {
      challenge_name: req.body.challenge_name,
      user_id: req.body.user_id,
    },
  });
  // console.log(myChallengeData.length, myProofData.length);
  const ProofData = await Proof.findAll({
    raw: true,
    where: { challenge_name: req.body.challenge_name },
    include: [
      {
        model: User,
        required: true,
        attributes: ['nickName'],
      },
    ],
    order: [['id', 'DESC']],
  });
  res.send({
    myChallengeLength: myChallengeData.length,
    myProofLength: myProofData.length,
    ProofData: ProofData,
  });
};

exports.upLoadData = async (req, res) => {
  // console.log('받은 데이터 확인: ', req.body);
  // console.log('받은 파일 데이터 확인: ', req.file);
  await Proof.create({
    challenge_name: req.body.challenge_name,
    user_id: req.body.user_id,
    img: '/img/' + req.file.filename,
  });
  res.send(true);
};

exports.deleteData = async (req, res) => {
  // console.log('img: ', req.body.img);
  fs.unlinkSync(`../${process.env.ROUTE}${req.body.img}`);
  await Proof.destroy({
    where: { img: req.body.img },
  });
  const ProofData = await Proof.findAll({
    raw: true,
    where: { challenge_name: req.body.challenge_name },
    order: [['id', 'DESC']],
  });
  res.send(ProofData);
};
