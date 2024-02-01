const bcrypt = require('bcrypt');
const router = require('express').Router();

const { User } = require('../db/models');

router.post('/login', async (req, res) => {
  const { user } = req.session;

  if (user) {
    res.json({ message: 'Вы уже авторизованы' });
  } else {
    try {
      const { username, password } = req.body;
      const check = await User.findOne({ where: { username } });
      if (check) {
        const checkPass = await bcrypt.compare(password, check.password);
        if (checkPass) {
          const cookie = structuredClone(check.get({ plain: true }));
          delete cookie.password;
          req.session.user = cookie;
          res.json(cookie);
        } else {
          res.json({ message: 'Неправильный пароль' });
        }
      } else {
        res.json({ message: 'Такой пользователь не существует' });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
});

router.get('/logout', (req, res) => {
  const { user } = req.session;
  if (user) {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.clearCookie('tabletest');
          res.sendStatus(200);
        }
      });
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(401);
  }
});

router.get('/sessions', async (req, res) => {
  const { user } = req.session;
  try {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
