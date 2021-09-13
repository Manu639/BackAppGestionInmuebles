const jwt = require('jsonwebtoken');

const executeQuery = (sql, arrValues = []) => {
    return new Promise((resolve, reject) => {
        db.query(
            sql, arrValues, (err, result) => {
                if (err) {
                    reject({
                        info: { success: false, message: err.message },
                        data: { err }
                    })
                };
                if (result.length === 0) resolve([]);
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

function createToken(user) {
    const obj = {
        name: user.name,
        userId: user.id,
        role: user.role_id,
    }

    return jwt.sign(obj, process.env.SECRET_KEY)
}

module.exports = {
    executeQueryUnique, executeQuery, createToken
}