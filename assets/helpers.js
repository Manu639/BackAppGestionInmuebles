const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')

const executeQuery = (sql, arrValues = []) => {
    return new Promise((resolve, reject) => {
        db.query(
            sql, arrValues, (err, result) => {
                if (err) reject(err);
                if (result.length === 0) resolve({ response: 'No se han encontrado registros' });
                resolve(result);
            }
        )
    });
}

const executeQueryUnique = (sql, arrValues = []) => {
    return new Promise((resolve, reject) => {
        db.query(
            sql,
            arrValues,
            (err, result) => {
                if (err) reject(err);
                if (result.length !== 1) resolve({});
                resolve(result[0]);
            }
        )
    });
}

function createToken(usuario) {

    const obj = {
        usuarioId: usuario.id,
        role: usuario.role_id,
        createdAt: dayjs().unix(),
        expiratedAt: dayjs().add(20, 'minutes').unix()
    }

    return jwt.sign(obj, process.env.SECRET_KEY)
}

module.exports = {
    executeQueryUnique, executeQuery, createToken
}