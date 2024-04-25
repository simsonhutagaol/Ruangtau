'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.belongsToMany(models.Course, {
        through: models.UserCourse,
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `name cant empty`
        },
        notNull: {
          msg: `name cant null`
        },
        len: {
          args: [3],
          msg: `name minimal 3 karakter`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `email sudah ada`
      },
      validate: {
        notEmpty: {
          msg: `email cant empty`
        },
        notNull: {
          msg: `email cant null`
        },
        isEmail: {
          msg: `fomat email salah`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `password cant empty`
        },
        notNull: {
          msg: `password cant null`
        },
        len: {
          args: [8],
          msg: `password minimal 8 karakter`
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.role = 'student'
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};