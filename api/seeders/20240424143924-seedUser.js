'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10)
    await queryInterface.bulkInsert('Users', [{
      name : 'ery',
      email : 'ery@gmail.com',
      password:await bcrypt.hash('admin123',salt),
      role : 'admin',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
