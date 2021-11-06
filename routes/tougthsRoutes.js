const express = require('express');
const router = express.Router();
const ToughtController = require('../controllers/ToughtController');
// Controller
// helpers
const checkAuth = require('../helpers/auth').checkAuth;

router.get('/add', checkAuth, ToughtController.createToughts);
router.post('/add', checkAuth, ToughtController.createToughtsSave);
router.get('/edit/:id', checkAuth, ToughtController.updateTought);
router.post('/edit', checkAuth, ToughtController.updateToughtSave);
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.post('/remove', checkAuth, ToughtController.removeTought);
router.get('/', ToughtController.showToughts);

module.exports = router;
