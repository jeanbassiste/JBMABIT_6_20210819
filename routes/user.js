const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/api/auth/signup', userCtrl.createUser);

router.post('/api/auth/login', userCtrl.login);

router.get;


module.exports = router;