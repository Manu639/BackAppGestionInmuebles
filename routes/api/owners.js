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
    try {
        let result = await update(req.body);
        console.log(req.body)
        res.json({
            success: true,
            results: result,
            message: 'Your owner has been updated!'
        })
    } catch (err) {
        res.json({
            success: false,
            err: err,
            message: 'Something went wrong... Try again!'
        })
    }
})

module.exports = router