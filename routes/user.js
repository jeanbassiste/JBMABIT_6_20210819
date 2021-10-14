//Configure les routes des requêtes sur les utilisateurs avec express et router
const express = require('express');
const router = express.Router();

//Fait appel au contrôleur d'utilisateur
const userCtrl = require('../controllers/user');

//Routes pour les requêtes de connexion et de création de compte
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
