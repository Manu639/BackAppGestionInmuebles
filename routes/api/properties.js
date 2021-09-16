let router = require('express').Router();
let jwt = require('jsonwebtoken');
const { getByUser, getByType, getById, update, getTypes, create } = require('../../models/property.model')

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

router.get('/types', async (req, res) => {
    try {
        let response = await getTypes();

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

router.get('/types/:typeId', async (req, res) => {
    try {
        let response = await getByType(req.params.typeId)

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
    try {
        let response = await getById(req.params.id)

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

router.put('/update', async (req, res) => {
    try {
        let response = await update(req.body);

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
})

router.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        req.body
        let response = await create(req.body);

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
})


module.exports = router