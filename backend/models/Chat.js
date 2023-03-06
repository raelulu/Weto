const Sequelize = require('sequelize');

class Chat extends Sequelize.Model {
  // 스태틱 메소드
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        // 첫번째 객체 인수는 테이블 필드에 대한 설정
        chat: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Chat',
        tableName: 'chat',
        freezeTableName: true,
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Chat.belongsTo(db.User, {
      foreignKey: 'User_nickName',
      targetKey: 'nickName',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.Chat.belongsTo(db.MatePost, {
      foreignKey: 'MatePost_id',
      targetKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = Chat;
