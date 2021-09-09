const { OAuth2Client } = require('google-auth-library');

const checkGoogleToken = async (req, res, next) => {
    try {
        const client = new OAuth2Client(req.body.clientId)

        const info = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: req.body.clientId
        })

        if (!info) {
            res.json('Invalid Token')
        }

        req.body.userGoogleInfo = info.getPayload()
        next()

    } catch (err) {
        res.json({
            success: false,
            err
        })
    }
}

module.exports = { checkGoogleToken }