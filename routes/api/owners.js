let router = require('express').Router();
const { getAll, getById, update } = require('../../models/owner.model')

router.get('/', async (req, res) => {
    let result = await getAll()
    res.json(result);
});

router.get('/:id', async (req, res) => {
    let result = await getById(req.params.id);
    res.json(result)
})

router.post('/update', async (req, res) => {
    let result = await update(req.body);
    res.json(result)
})

module.exports = router