const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', sauceCtrl.getAllSauce);
router.get('/:id', sauceCtrl.getSauce);

router.post('/', multer, sauceCtrl.createSauce);
router.put('/:id', multer, sauceCtrl.updateSauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.post('/:id/like', sauceCtrl.likeSauce);

module.exports = router;  