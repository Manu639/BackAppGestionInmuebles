let router = require('express').Router();
let bcrypt = require('bcrypt');
const { create, getByEmail, getRoles } = require('../../models/user.model')


router.use('/create', async (req, res) => {
    try {
        //TODO encrypt password first bcrypt
        let result = await create(req.body);
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})


router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 11);
        let result = await create(req.body);
        res.json({
            success: true,
            user: req.body,
            message: 'Create user successful'
        })
    } catch (err) {
        res.json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        let user = getByEmail(req.body.email)

        if (!user) {
            res.json({ success: false, message: 'El correo o la contraseña no son correctos' })
        }

        let match = bcrypt.compareSync(req.body.password, user.password)

        if (!match) {
            res.json({ success: false, message: 'El correo o la contraseña no son correctos' })
        }

        res.json(result)
    } catch (err) {
        res.json(err)
    }
})

module.exports = router