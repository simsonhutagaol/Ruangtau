'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
    get title() {
      if (this.gender === 'male') {
        return this.name = `Mr.${this.name}`
      } else if (this.gender === 'female') {
        return this.name = `Ms.${this.name}`
      }
    }
  }
  Profile.init({
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
    dateOfBirth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `dateOfBirth cant empty`
        },
        notNull: {
          msg: `dateOfBirth cant null`
        },
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `phone cant empty`
        },
        notNull: {
          msg: `phone cant null`
        },
        len: {
          args: [10],
          msg: `phone minimal 10 karakter`
        }
      }
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `gender cant empty`
        },
        notNull: {
          msg: `gender cant null`
        },
      }
    },
    UserId: DataTypes.INTEGER,
    background: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `background cant empty`
        },
        notNull: {
          msg: `background cant null`
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};