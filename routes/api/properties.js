let router = require('express').Router();
const { getAll, getByType, getById } = require('../../models/properties.model')

router.get('/', async (req, res) => {
    let result = await getAll()
    res.json(result);
});

//Return all the properties filtered by type
router.get('/type/:typeId', async (req, res) => {
    let result = await getByType(req.params.typeId)
    res.json(result);
});

router.get('/:id', async (req, res) => {
    let result = await getById(req.params.id)
    res.json(result);
});

module.exports = router