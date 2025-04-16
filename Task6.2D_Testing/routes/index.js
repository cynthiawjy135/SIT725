const express = require('express');
const router = express.Router();

const projectsRouter = require('./projectRoute');
const usersRouter = require('./userRoute');

router.use('/projects', projectsRouter);
router.use('/users', usersRouter);

module.exports = router;

