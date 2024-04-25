'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category)
      Course.belongsToMany(models.User, {
        through: models.UserCourse,
      })
    }
  }
  Course.init({
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `description cant empty`
        },
        notNull: {
          msg: `description cant null`
        },
        len: {
          args: [20],
          msg: `description minimal 3 karakter`
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `duration cant empty`
        },
        notNull: {
          msg: `duration cant null`
        },
        len: {
          args: [10],
          msg: `duration minimal 10 menit`
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Category id cant empty`
        },
        notNull: {
          msg: `Category id cant null`
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};