const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const { getById } = require('../models/usuario.model');

const checkToken = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.json({ error: 'No se ha recibido el token de identificación' });
    }

    const token = req.headers.authorization;

    let obj;

    try {
        obj = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return res.json({ error: 'El token es incorrecto BITCH' });
    }

    if (obj.expiratedAt < dayjs().unix()) {
        return res.json({ error: 'El token está caducado' });
    }

    const user = await getById(obj.usuarioId);

    req.usuario = user

    next();

}


function checkRole(pValue) {
    return (req, res, next) => {
        if (req.usuario.role === pValue) {
            next();
        } else {
            res.json({ error: `no tienes el rol de ${pValue}` })
        }
    }
}

module.exports = { checkToken, checkRole }