let router = require('express').Router();
let ownersRouter = require('./api/owners.js');
let propertiesRouter = require('./api/properties.js');
let usersRouter = require('./api/users.js');


router.use('/owners', ownersRouter);
router.use('/properties', propertiesRouter);
router.use('/users', usersRouter);


module.exports = router;