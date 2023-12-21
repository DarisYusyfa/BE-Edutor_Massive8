const { Model } = require("sequelize");
const { hash, compare } = require("../helpers/hash");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
      hooks: {
        beforeCreate: (user, opt) => {
          user.password = hash(user.password);
        },
      },
    }
  );
  return User;
};
