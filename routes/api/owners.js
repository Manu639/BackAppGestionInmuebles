let router = require('express').Router();
const jwt = require('jsonwebtoken');
const { getByUser, getById, update } = require('../../models/owner.model')

router.get('/', async (req, res) => {
    try {
        let tokenInfo = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
        let response = await getByUser(tokenInfo.userId)

        res.json({
            info: { success: true, message: 'query has been done' },
            data: { response }
        });

    } catch (err) {
        res.json({
            info: { success: false, message: 'something went wrong with the query' },
            data: { err }
        })
    }
});

router.get('/:id', async (req, res) => {
    let owner = await getById(req.params.id);
    res.json({
        info: { success: true, message: 'query has been done' },
        data: { owner }
    })
})

router.post('/update', async (req, res) => {
    try {
        let owner = await update(req.body);
        res.json({
            info: { success: true, message: 'Your owner has been updated' },
            data: { owner }
        })

    } catch (err) {
        res.json({
            info: { success: false, message: 'Something went wrong with the query' },
            data: { err }
        })
    }
})

module.exports = router