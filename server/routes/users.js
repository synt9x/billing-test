const bcrypt = require('bcrypt');
const router = require('express').Router();

const Users = require('../classes/User');

const { User } = require('../db/models');

router.get('/', async (req, res) => {
  const { user } = req.session;
  if (user.isAdmin === true) {
    try {
      const dataUsers = await User.findAll({ where: { isAdmin: false } });
      const newDataUsers = dataUsers.map((el) => el.get({ plain: true }));
      res.json(newDataUsers);
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

router.patch('/balance', async (req, res) => {
  const { user } = req.session;
  const { action, id, sum } = req.body;
  if (user.isAdmin === true) {
    try {
      const checkUser = await User.findOne({ where: { id } });
      const newDataUser = checkUser.get({ plain: true });
      const mainUser = new Users(newDataUser.id, newDataUser.balance);
      if (newDataUser) {
        if (action === 'add') {
          const newBalance = mainUser.addSumToBalance(sum);
          const newUserData = await checkUser.update({ balance: newBalance });
          const newUserDataSub = newUserData.get({ plain: true });
          res.json(newUserDataSub);
        } else if (action === 'subtract') {
          const newBalance = mainUser.subtractSumToBalance(sum);
          if (typeof newBalance === 'number') {
            const newUserData = await checkUser.update({ balance: newBalance });
            res.json(newUserData);
          } else {
            res.json(newBalance);
          }
        }
      } else {
        res.json({ message: 'Такой пользователь не существует' });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

router.patch('/dispatch', async (req, res) => {
  const { user } = req.session;
  const { sender, recipient, sum } = req.body;

  if (user.isAdmin === true) {
    try {
      const checkedUserSender = await User.findOne({ where: { id: sender } });
      const checkedUserRecipient = await User.findOne({
        where: { id: recipient },
      });

      if (checkedUserSender) {
        const senderUser = new Users(
          checkedUserSender.id,
          checkedUserSender.balance,
        );
        const senderBalance = senderUser.subtractSumToBalance(sum);
        if (typeof (senderBalance) === 'number') {
          if (checkedUserRecipient) {
            const recipientUser = new Users(
              checkedUserRecipient.id,
              checkedUserRecipient.balance,
            );
            const newRecipientBalance = recipientUser.addSumToBalance(sum);
            const newDataSender = await checkedUserSender.update({
              balance: senderBalance,
            });
            const newDataRecipient = await checkedUserRecipient.update({
              balance: newRecipientBalance,
            });
            res.json({ newDataSender, newDataRecipient });
          } else {
            res.json({ message: 'Такого получателя не существует' });
          }
        } else {
          res.json(senderBalance);
        }
      } else {
        res.json({ message: 'Такого отправителя не существует' });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
});

router.get('/:id', async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  if (user) {
    try {
      const userData = await User.findOne({ where: { id } });
      res.json(userData);
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
