//Connecte les routes pour les requêtes sur les sauces en utilisant express
const express = require('express');
const router = express.Router();

//Fait appel à nos middleware d'authentification pour que seuls les utilisateurs authorisés puissent faire les requêtes (connecté pour get et le bon utilisateur pour post sauf like)
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Fait appel au contrôleur des sauces
const sauceCtrl = require('../controllers/sauce');


//Requêtes pour récupérer toutes les sauces et une sauce identifiée par son id
router.get('/', sauceCtrl.getAllSauce);
router.get('/:id', sauceCtrl.getSauce);

//Requêtes pour créer, modifier, supprimer et liker/disliker une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;  
