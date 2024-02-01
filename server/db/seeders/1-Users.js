'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          username: 'admin',
          password: await bcrypt.hash('admin', 10),
          balance: 0,
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          username: 'kolya',
          password: await bcrypt.hash('1', 10),
          balance: 0,
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          username: 'misha',
          password: await bcrypt.hash('2', 10),
          balance: 0,
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          username: 'vasya',
          password: await bcrypt.hash('3', 10),
          balance: 0,
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          username: 'oleg',
          password: await bcrypt.hash('4', 10),
          balance: 0,
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          username: 'nikita',
          password: await bcrypt.hash('5', 10),
          balance: 0,
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
