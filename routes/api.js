let router = require('express').Router();
let ownersRouter = require('./api/owners.js');
let propertiesRouter = require('./api/properties.js');

/* GET home page. */
router.use('/owners', ownersRouter);
router.use('/properties', propertiesRouter);

module.exports = router;