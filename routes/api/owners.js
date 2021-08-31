let router = require('express').Router();
const { getAll } = require('../../models/owner.model')

router.get('/', async (req, res) => {
    let result = await getAll()
    res.json(result);
});

module.exports = router