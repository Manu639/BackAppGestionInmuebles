const router = require('express').Router();
const bcrypt = require('bcrypt');
const { createToken } = require('../../assets/helpers');
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

        let user = await getByEmail(req.body.email)
        if (user.email) {
            res.json({
                info: { success: false, message: 'user already created' },
                data: {}
            })
        }

        if (!user.email) {
            req.body.password = bcrypt.hashSync(req.body.password, 11);
            await create(req.body);
            let token = createToken(req.body)
            res.json({
                info: { success: true, message: 'Create user successful' },
                data: { token }
            })
        }

    } catch (err) {
        res.json({
            info: { success: false, message: 'Create user failed' },
            data: { err: err.message }
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        let user = await getByEmail(req.body.email)
        console.log(user)
        if (!user.email) {
            res.json({
                info: { success: false, message: 'Invalid email or invalid password' },
                data: {}
            })
        }
        console.log(req.body.password)
        console.log(user.password)
        let isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) {
            res.json({
                info: { success: false, message: 'Invalid email or invalid password' },
                data: {}
            })
        } else {

            let token = createToken(user)
            res.json({
                info: { success: true, message: 'user is logged' },
                data: { token }
            })
        }

    } catch (err) {
        res.json({
            info: { success: false, message: err.message },
            data: { err }
        })
    }
})

router.post('/googleaccount', checkGoogleToken, async (req, res) => {
    try {
        const { email, given_name, family_name, jti } = req.body.userGoogleInfo

        let user = await getByEmail(email)
        console.log(user)

        if (!user.email) {
            await create({ email: email, password: jti, name: given_name, last_name: family_name, role_id: 25 })
            let registeredUser = await getByEmail(email);

            res.json({
                info: { success: true, message: 'the user has been registered' },
                data: { registeredUser }
            })
        }

        res.json({
            info: { success: true, message: 'user has been logged' },
            data: { user }
        })

    } catch (err) {
        res.json({
            info: { success: false, message: err },
            data: { err }
        })
    }
})




module.exports = router