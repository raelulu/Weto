const MatePost = require('../models/MatePost');
const { Op } = require('sequelize');
const fs = require('fs');
const User = require('../models/User');

exports.showCrew = async (req, res) => {
  console.log('나의 도시: ', req.query.city);
  const showCrew = await MatePost.findAll({
    // raw: true,
    where: {
      address: {
        [Op.like]: '%' + req.query.city + '%',
      },
    },
    order: [['id', 'DESC']],
    include: [
      {
        model: User,
        as: 'users',
        attributes: ['nickName'],
      },
    ],
  });
  console.log(showCrew);
  res.send(showCrew);
};
exports.putCrew = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const newCrew = await MatePost.create({
    title: req.body.title,
    info: req.body.info,
    max: req.body.max,
    User_nickName: req.body.nickName,
    image: '/img/' + req.file.filename,
    address: req.body.city,
  });

  await newCrew.addUsers(req.decoded.id);
  console.log(newCrew);
  res.send(newCrew.dataValues);
};

exports.crewDel = async (req, res) => {
  console.log(req.body);
  await MatePost.destroy({
    where: { id: req.body.id },
  });
  fs.unlinkSync(`../${process.env.ROUTE}${req.body.image}`);
  res.send(true);
};
