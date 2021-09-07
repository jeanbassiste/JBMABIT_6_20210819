const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.get('/', sauceCtrl.getAllSauce);
router.get('/:id', sauceCtrl.getSauce);

router.post('/', sauceCtrl.createSauce);
router.put('/:id', sauceCtrl.updateSauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.post('/:id/like', sauceCtrl.likeSauce);

module.exports = router;