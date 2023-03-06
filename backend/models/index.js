const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const Challenge = require('./Challenge');
const Chat = require('./Chat');
const MatePost = require('./MatePost');
const User = require('./User');
const Proof = require('./Proof');

// config.json -> config.js파일로 변경
// const config = require("../config/config.json")[env];
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Challenge = Challenge;
db.MatePost = MatePost;
db.Chat = Chat;
db.Proof = Proof;

User.init(sequelize);
Challenge.init(sequelize);
MatePost.init(sequelize);
Chat.init(sequelize);
Proof.init(sequelize);

User.associate(db);
// Challenge.associate(db);
MatePost.associate(db);
Chat.associate(db);
Proof.associate(db);

module.exports = db;
