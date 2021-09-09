const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkGoogleToken } = require('../../assets/middlewares');
const { create, getByEmail, getRoles } = require('../../models/user.model')

router.get('/roles', async (req, res) => {
    try {
        //TODO encrypt password first bcrypt
        let result = await getRoles();
        res.json({ success: true, result, message: 'get roles succeded' })
    } catch (error) {
        res.json({ success: false, error, message: 'get roles failed' })
    }
})

router.post('/register', async (req, res) => {
    try {
        //TODO encrypt password first bcrypt
        req.body.password = bcrypt.hashSync(req.body.password, 11);
        await create(req.body);
        res.json({
            success: true,
            user: req.body,
            message: 'Create user successful'
        })
    } catch (err) {
        res.json({
            success: false,
            err,
            message: 'Create user failed'
        })
    }
})

router.post('/googleaccount', checkGoogleToken, async (req, res) => {
    try {
        const { email, given_name, family_name, jti } = req.body.userGoogleInfo

        await create({ email: email, password: jti, name: given_name, last_name: family_name, role_id: 25 })

        res.send('Registrado')
    } catch (err) {
        res.json({
            success: false,
            error: err
        })
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