let router = require('express').Router();
const jwt = require('jsonwebtoken');
const { getByUser, getById, update, create, createUserOwnerIndex } = require('../../models/owner.model')

router.get('/', async (req, res) => {
    try {
        let tokenInfo = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
        let response = await getByUser(tokenInfo.userId)

        res.json({
            info: { success: true, message: 'query has been done' },
            data: response
        });

    } catch (err) {
        res.json({
            info: { success: false, message: 'something went wrong with the query' },
            data: err
        })
    }
});

router.get('/:id', async (req, res) => {
    let owner = await getById(req.params.id);
    res.json({
        info: { success: true, message: 'query has been done' },
        data: owner
    })
})

router.post('/create', async (req, res) => {
    try {
        let userInfo = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
        let response = await create(req.body)
        await createUserOwnerIndex(userInfo.userId, response.insertId)

        res.json({
            info: { success: true, message: 'New owner has been registered' },
            data: response
        })

    } catch (err) {
        res.json({
            info: { success: true, message: 'Something went wrong...' },
            data: err
        })
    }
})

router.put('/update', async (req, res) => {
    try {
        let owner = await update(req.body);
        res.json({
            info: { success: true, message: 'Your owner has been updated' },
            data: owner
        })

    } catch (err) {
        res.json({
            info: { success: false, message: 'Something went wrong with the query' },
            data: err
        })
    }
})

module.exports = router