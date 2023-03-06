const Sequelize = require('sequelize');

class Proof extends Sequelize.Model {
  // 스태틱 메소드
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        challenge_name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Proof',
        tableName: 'Proof',
        freezeTableName: true,
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Proof.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = Proof;
