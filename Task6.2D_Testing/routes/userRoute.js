const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');


router.post('/', userController.saveNewUser)

router.get('/', userController.getAllUsers)

module.exports = router;