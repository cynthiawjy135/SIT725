const express = require('express');
const router = express.Router();
const { projectController } = require('../controllers');


router.get('/', projectController.getMyProjects)

module.exports = router;