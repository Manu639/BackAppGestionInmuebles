let router = require('express').Router();
let ownersRouter = require('./api/owners.js')

/* GET home page. */
router.use('/owners', ownersRouter)

module.exports = router;
