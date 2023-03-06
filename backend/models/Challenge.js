const Sequelize = require('sequelize');

class Challenge extends Sequelize.Model {
  // 스태틱 메소드
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        // 첫번째 객체 인수는 테이블 필드에 대한 설정
        // title: {
        //   type: Sequelize.STRING(100),
        //   allowNull: false,
        // },
        // info: {
        //   type: Sequelize.TEXT,
        //   allowNull: false,
        // },
        // startDate: {
        //   type: Sequelize.TEXT,
        //   allowNull: false,
        // },
        // endDate: {
        //   type: Sequelize.TEXT,
        //   allowNull: false,
        // },
        challenge_name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        user_phone: {
          type: Sequelize.STRING(11),
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Challenge',
        tableName: 'challenge',
        freezeTableName: true,
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  // 다른 모델과의 관계
  // static associate(db) {
  //   db.Challenge.belongsToMany(db.User, {
  //     foreignKey: 'Challenge_id',
  //     through: 'challenge_user_join',
  //     onDelete: 'cascade',
  //     onUpdate: 'cascade',
  //   });

  //   db.Challenge.belongsTo(db.User, {
  //     foreignKey: 'user_nickName',
  //     sourceKey: 'nickName',
  //     onDelete: 'cascade',
  //     onUpdate: 'cascade',
  //   });
  // }
}

module.exports = Challenge;
