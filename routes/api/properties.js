let router = require('express').Router();
let jwt = require('jsonwebtoken');
const { getByUser, getByType, getById, update } = require('../../models/property.model')

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

//Return all the properties filtered by type
router.get('/type/:typeId', async (req, res) => {
    let result = await getByType(req.params.typeId)
    res.json(result);
});

router.get('/:id', async (req, res) => {
    let result = await getById(req.params.id)
    res.json(result);
});

router.post('/update', async (req, res) => {
    let result = await update(req.body);
    res.json(result)
})


module.exports = router